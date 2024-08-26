const fs = require('fs');
const types = require("@babel/types");
const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const generator = require("@babel/generator").default;


//js混淆代码读取
process.argv.length > 2 ? encodeFile = process.argv[2] : encodeFile = "./encode.js";
process.argv.length > 3 ? decodeFile = process.argv[3] : decodeFile = "./decodeResult.js";

//将源代码解析为AST
let sourceCode = fs.readFileSync(encodeFile, { encoding: "utf-8" });

let ast = parser.parse(sourceCode);


console.time("处理完毕，耗时");


const simplifyLiteral = {//处理十六进制数字和字符串
	NumericLiteral({ node }) {
		if (node.extra && /^0[obx]/i.test(node.extra.raw)) {
			node.extra = undefined;
		}
	},
	StringLiteral({ node }) {
		if (node.extra && /\\[ux]/gi.test(node.extra.raw)) {
			node.extra = undefined;
		}
	},
}


traverse(ast, simplifyLiteral);


const keyToLiteral = {//将object的key字段字符串化
	MemberExpression:
	{
		exit({ node }) {
			const prop = node.property;
			if (!node.computed && types.isIdentifier(prop)) {
				node.property = types.StringLiteral(prop.name);
				node.computed = true;
			}
		}
	},
	ObjectProperty:
	{
		exit({ node }) {
			const key = node.key;
			if (!node.computed && types.isIdentifier(key)) {
				node.key = types.StringLiteral(key.name);
			}
		}
	},
}

traverse(ast, keyToLiteral);


const constantFold = {//常量折叠
    "BinaryExpression|UnaryExpression"(path) {
     if(path.isUnaryExpression({operator:"-"}) || 
    	   path.isUnaryExpression({operator:"void"}))
    	{
    		return;
    	}
        const {confident, value} = path.evaluate();
        if (!confident)
            return;
        if (typeof value == 'number' && (!Number.isFinite(value))) {
            return;
        }
        path.replaceWith(types.valueToNode(value));
    },
}

traverse(ast, constantFold);


const standardLoop =
{//给不标准的块语句加上{}
    "ForStatement|WhileStatement|ForInStatement|ForOfStatement"({ node }) {
        if (!types.isBlockStatement(node.body)) {
            node.body = types.BlockStatement([node.body]);
        }
    },
    IfStatement(path)
    {
    	const consequent = path.get("consequent");
    	const alternate  = path.get("alternate");
    	if (!consequent.isBlockStatement()) 
    	{
    		consequent.replaceWith(types.BlockStatement([consequent.node]));
    	}
    	if (alternate.node !== null && !alternate.isBlockStatement()) {
    		alternate.replaceWith(types.BlockStatement([alternate.node]));
    	}
    },
}

traverse(ast, standardLoop);


const LogicalToIfStatement =
{//逻辑板表达式转if语句
	LogicalExpression(path) {
		let { node, parentPath } = path;
		if (!parentPath.isExpressionStatement()) {
			return;
		}
		let { left, operator, right } = node;

		let blockNode = types.BlockStatement([]);
		let newNode = types.BlockStatement([types.ExpressionStatement(right)])

		let ifNode = undefined;

		if (operator == "||") {
			ifNode = types.IfStatement(left, blockNode, newNode);
		}
		else if (operator == "&&") {
			ifNode = types.IfStatement(left, newNode, null);
		}
		else {
			return;
		}

		parentPath.replaceWith(ifNode);
	},

}

traverse(ast, LogicalToIfStatement);



function SequenceOfStatement(path) {
	let { scope, parentPath, node } = path;
	let expressions = node.expressions;
	if (parentPath.isReturnStatement({ "argument": node })) {
		parentPath.node.argument = expressions.pop();
	}
	else if (parentPath.isIfStatement({ "test": node }) ||
		parentPath.isWhileStatement({ "test": node })) {
		parentPath.node.test = expressions.pop();
	}
	else if (parentPath.isForStatement({ "init": node })) {
		parentPath.node.init = expressions.pop();
	}
	else if (parentPath.isSwitchStatement({ "discriminant": node })) {
		parentPath.node.discriminant = expressions.pop();
	}
	else if (parentPath.isExpressionStatement({ "expression": node })) {
		parentPath.node.expression = expressions.pop();
	}
	else {
		return;
	}
	for (let expression of expressions) {
		parentPath.insertBefore(types.ExpressionStatement(expression = expression));
	}

	scope.crawl(); // 遍历某些大文件时可能比较慢。
}


function SequenceOfExpression(path) {

	let { scope, parentPath, node, parent } = path;
	let ancestorPath = parentPath.parentPath;
	let expressions = node.expressions;
	if (parentPath.isConditionalExpression({ "test": node }) &&
		ancestorPath.isExpressionStatement({ "expression": parent })) {
		parentPath.node.test = expressions.pop();
	}
	else if (parentPath.isVariableDeclarator({ "init": node }) &&
		ancestorPath.parentPath.isBlock()) {
		parentPath.node.init = expressions.pop();
	}
	else if (parentPath.isAssignmentExpression({ "right": node }) &&
		ancestorPath.isExpressionStatement({ "expression": parent })) {
		parentPath.node.right = expressions.pop();
	}
	else {
		return;
	}

	for (let expression of expressions) {
		ancestorPath.insertBefore(types.ExpressionStatement(expression = expression));
	}

	scope.crawl(); // 遍历某些大文件时可能比较慢	


}



const resolveSequence =
{//处理逗号表达式
	SequenceExpression:
	{//对同一节点遍历多个方法
		enter: [SequenceOfStatement, SequenceOfExpression]
	}
}



traverse(ast, resolveSequence);

ast = parser.parse(generator(ast).code);

traverse(ast, resolveSequence);

function isNodeLiteral(node) {
	if (Array.isArray(node)) {
		return node.every(ele => isNodeLiteral(ele));
	}
	if (types.isLiteral(node)) {
		if (node.value == null) {
			return false;
		}
		return true;
	}
	if (types.isBinaryExpression(node)) {
		return isNodeLiteral(node.left) && isNodeLiteral(node.right);
	}
	if (types.isUnaryExpression(node, {
		"operator": "-"
	}) || types.isUnaryExpression(node, {
		"operator": "+"
	})) {
		return isNodeLiteral(node.argument);
	}

	if (types.isObjectExpression(node)) {
		let { properties } = node;
		if (properties.length == 0) {
			return true;
		}

		return properties.every(property => isNodeLiteral(property));

	}
	if (types.isArrayExpression(node)) {
		let { elements } = node;
		if (elements.length == 0) {
			return true;
		}
		return elements.every(element => isNodeLiteral(element));
	}

	return false;
}


const callToString =
{//字符串还原
	FunctionDeclaration(path) {
		let { parentPath, node } = path;
		let { id, params, body } = node;
		let name = id.name;
		if (name != 'b' || params.length != 1 || body.body.length != 3) {
			return;
		}
		let scope = parentPath.scope;

		let binding = scope.getBinding(name);

		if (!binding || binding.references != 3) {
			return;
		}
		let obfuscatorPaths = [path], funcNames = [];
		let decodePath = "";
		for (let referPath of binding.referencePaths) {
			if (path.isAncestor(referPath)) {
				continue;
			}
			let { parentPath, node } = referPath;

			if (!parentPath.isCallExpression()) return;  //引用的地方都是 CallExpression

			let funcPath = parentPath.findParent(p => p.isFunctionDeclaration());//找 FunctionDeclaration父节点，即解密函数
			if (!funcPath) {
				funcPath = parentPath.findParent(p => p.isExpressionStatement());//找 ExpressionStatement 父节点，即移位函数
				if (!funcPath) return;
			}
			else {
				funcNames.push(funcPath.node.id.name);
				decodePath = funcPath;
			}

			obfuscatorPaths.push(funcPath);
		}

		let obfuscatorCode = "";
		obfuscatorPaths.forEach(eachPath => { obfuscatorCode += eachPath.toString() });


		let funcAst = parser.parse(obfuscatorCode);
		obfuscatorCode = generator(funcAst, opts = { "compact": true }).code;

		eval(obfuscatorCode);

		scope.traverse(scope.block, {
			AssignmentExpression(path) {
				let { scope, node } = path;
				let { left, operator, right } = node;
				if (!types.isIdentifier(left) || operator != "=" ||
					!types.isIdentifier(right, { "name": "c" })) {
					return;
				}

				let name = left.name
				let binding = scope.getBinding(name);

				if (!binding || binding.constantViolations.length > 2) {
					return;
				}

				for (let referPath of binding.referencePaths) {
					let { parentPath, node } = referPath;
					if (!parentPath.isCallExpression({ "callee": node })) {

						referPath.replaceWith(right);

						continue;
					}

					let { arguments } = parentPath.node;

					if (arguments.length != 1 || !isNodeLiteral(arguments)) {
						continue;
					}

					let value = c(arguments[0].value);
					console.log(parentPath.toString(), "-->", value);
					parentPath.replaceWith(types.valueToNode(value));

				}

				path.remove();
			},
		});
		obfuscatorPaths.forEach(eachPath => { eachPath.remove(); });

	}
}

traverse(ast, callToString);


const collectKeyAndValueOfObject = {//将key和Value归并到Object内部
	AssignmentExpression({ node, parentPath }) {

		if (!parentPath.isExpressionStatement({ "expression": node })) {
			return;
		}

		let { left, operator, right } = node;
		if (!types.isIdentifier(left) || operator != "=" ||
			!types.isObjectExpression(right)) {
			return;
		}

		let name = left.name;

		let properties = right.properties;

		let allNextSiblings = parentPath.getAllNextSiblings();
		for (let nextSibling of allNextSiblings) {
			if (!nextSibling.isExpressionStatement()) break;

			let expression = nextSibling.get('expression');
			if (!expression.isAssignmentExpression({ operator: "=" })) break;

			let { left, right } = expression.node;
			if (!types.isMemberExpression(left)) break;

			let { object, property } = left;
			if (!types.isIdentifier(object, { name: name }) ||
				!types.isStringLiteral(property)) {
				break;
			}

			properties.push(types.ObjectProperty(property, right));
			nextSibling.remove();
		}

	},
}


traverse(ast, collectKeyAndValueOfObject);


const changeOfObject = {//将下一条满足条件的语句进行同样的初始化。
	AssignmentExpression(path) {
		
		let { parentPath, node } = path;
		if (!parentPath.isExpressionStatement({ "expression": node })) {
			return;
		}

		let { left, operator, right } = node;
		if (!types.isIdentifier(left) || operator != "=" ||
			!types.isObjectExpression(right)) {
			return;
		}

		let OldNode = right;


		let name = left.name;
		let nextSibling = parentPath.getNextSibling();
		if (nextSibling.isExpressionStatement() && nextSibling.get('expression').isAssignmentExpression()) {

			let { left, operator, right } = nextSibling.get('expression').node;

			if (types.isIdentifier(right, { "name": name })) {

				nextSibling.node.expression.right = OldNode;
			}
		}

	},
}

traverse(ast, changeOfObject);




ast = parser.parse(generator(ast).code);


console.log("Object Decode .......");

function savePropertiesToObject(properties, newMap) { // 保存object 的 key 和 value 到 Map中
	for (const property of properties) {
		if (!property.key) {
			break;
		}
		let propKey = property.key.value;
		let propValue = property.value;
		if (!propKey || propKey.length != 5) break;//如果是ob混淆，key的长度都是5
		if (types.isStringLiteral(propValue)) {
			newMap.set(propKey, propValue);
		}
		else if (types.isFunctionExpression(propValue)) {
			let retState = propValue.body.body;
			if (retState.length == 1 && types.isReturnStatement(retState[0])) {
				let argument = retState[0].argument;
				if (types.isCallExpression(argument)) {
					newMap.set(propKey, "Call");
					continue;
				}
				if (types.isBinaryExpression(argument) ||
					types.isLogicalExpression(argument)) {
					newMap.set(propKey, argument.operator);
				}
			}
		}
		else {
			break;
		}
	}
}




const decodeObject = { //还原ob混淆的object
	AssignmentExpression(path) {
		
		let { node, scope } = path;
		let { left, operator, right } = node;
		if (!types.isIdentifier(left) || operator != "=" ||
			!types.isObjectExpression(right)) {
			return;
		}

		let name = left.name;
		let properties = right.properties;
		if (properties.length == 0) return;

		let binding = scope.getBinding(name);
		if (!binding || binding.constantViolations.length != 1) {
			return;
		}
		if (binding.referencePaths.length == 0) {
			path.remove();
		}



		let newMap = new Map();
		savePropertiesToObject(properties, newMap);
		if (newMap.size != properties.length) return;

		for (const referPath of binding.referencePaths.reverse()) {
			let { node, parent, parentPath } = referPath;
			let ancestorPath = parentPath.parentPath;
			if (!parentPath.isMemberExpression({ object: node })) {
				continue;
			}
			let propKey = parent.property.value;
			let propValue = newMap.get(propKey);
			if (!propValue) {
				continue;
			}

			if (typeof propValue != "string") {
				parentPath.replaceWith(propValue);
				continue;
			}
			if (ancestorPath.isCallExpression({ callee: parent })) {
				let { arguments } = ancestorPath.node;
				switch (propValue) {
					case "Call":
						ancestorPath.replaceWith(types.CallExpression(arguments[0], arguments.slice(1)));
						break;
					case "||":
					case "&&":
						ancestorPath.replaceWith(types.LogicalExpression(propValue, arguments[0], arguments[1]));
						break;
					default:
						ancestorPath.replaceWith(types.BinaryExpression(propValue, arguments[0], arguments[1]));
						break;
				}
			}
		}

		newMap.clear();

		scope.crawl();



	},
}

traverse(ast, decodeObject);





ast = parser.parse(generator(ast).code);


const removeDeadCode = {//删除垃圾代码
	"IfStatement|ConditionalExpression"(path) {
		let { consequent, alternate } = path.node;
		let testPath = path.get('test');
		const evaluateTest = testPath.evaluateTruthy();
		if (evaluateTest === true) {
			if (types.isBlockStatement(consequent)) {
				consequent = consequent.body;
			}
			path.replaceWithMultiple(consequent);
		}
		else if (evaluateTest === false) {
			if (alternate != null) {
				if (types.isBlockStatement(alternate)) {
					alternate = alternate.body;
				}
				path.replaceWithMultiple(alternate);
			}
			else {
				path.remove();
			}
		}
	},
	EmptyStatement(path) {
		path.remove();
	},
}

traverse(ast, removeDeadCode);

ast = parser.parse(generator(ast).code);

traverse(ast, decodeObject);


//去控制流
const decodeControlFlow = {

	AssignmentExpression(path) {
		//将下一条满足条件的语句进行同样的初始化。
		let { node, scope, parentPath } = path;
		if (!parentPath.isExpressionStatement({ "expression": node })) {
			return;
		}
		let { left, operator, right } = node;
		if (!types.isIdentifier(left) || operator != "=" ||
			!types.isCallExpression(right)) {
			return;
		}
		let nextSibling = parentPath.getNextSibling();
		if (!nextSibling.isForStatement()) {
			return;
		}
		const { test, body } = nextSibling.node;
		if (!types.isLiteral(test, { value: true })) return;
		if (body.body.length != 2) return;
		let switchNode = body.body[0], breakNode = body.body[1];
		if (!types.isSwitchStatement(switchNode) ||
			!types.isBreakStatement(breakNode)) {
			return;
		}
		let { cases } = switchNode;
		let disPatchArray = right.callee.object.value.split("|");
		let retBody = [];
		disPatchArray.forEach(index => {
			let caseBody = cases[index].consequent;
			if (types.isContinueStatement(caseBody[caseBody.length - 1])) {
				caseBody.pop();
			}
			retBody = retBody.concat(caseBody);
		})
		nextSibling.replaceWithMultiple(retBody);

		parentPath.remove();


	}
}

traverse(ast, decodeControlFlow);




console.timeEnd("处理完毕，耗时");


let { code } = generator(ast, opts = { jsescOption: { "minimal": true } });

fs.writeFile(decodeFile, code, (err) => { });