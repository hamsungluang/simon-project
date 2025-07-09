package com.anjia.unidbgserver.service;

import com.anjia.unidbgserver.config.UnidbgProperties;
import com.github.unidbg.worker.Worker;
import com.github.unidbg.worker.WorkerPool;
import com.github.unidbg.worker.WorkerPoolFactory;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.util.concurrent.CompletableFuture;
import java.util.concurrent.TimeUnit;

@Slf4j
@Service("MfwWorker")
public class MfwServiceWorker extends Worker {

    private UnidbgProperties unidbgProperties;
    private WorkerPool pool;
    private MfwService mfwService;

    @Autowired
    public void init(UnidbgProperties unidbgProperties) {
        this.unidbgProperties = unidbgProperties;
    }

    public MfwServiceWorker() {
        super(WorkerPoolFactory.create(TTEncryptServiceWorker::new, Runtime.getRuntime().availableProcessors()));
    }

    public MfwServiceWorker(WorkerPool pool) {
        super(pool);
    }

    @Autowired
    public MfwServiceWorker(UnidbgProperties unidbgProperties,
                                  @Value("${spring.task.execution.pool.core-size:4}") int poolSize) {
        super(WorkerPoolFactory.create(TTEncryptServiceWorker::new, Runtime.getRuntime().availableProcessors()));
        this.unidbgProperties = unidbgProperties;
        if (this.unidbgProperties.isAsync()) {
            pool = WorkerPoolFactory.create(pool -> new TTEncryptServiceWorker(unidbgProperties.isDynarmic(),
                unidbgProperties.isVerbose(), pool), Math.max(poolSize, 4));
            log.info("线程池为:{}", Math.max(poolSize, 4));
        } else {
            this.mfwService = new MfwService(unidbgProperties);
        }
    }

    public MfwServiceWorker(boolean dynarmic, boolean verbose, WorkerPool pool) {
        super(pool);
        this.unidbgProperties = new UnidbgProperties();
        unidbgProperties.setDynarmic(dynarmic);
        unidbgProperties.setVerbose(verbose);
        log.info("是否启用动态引擎:{},是否打印详细信息:{}", dynarmic, verbose);
        this.mfwService = new MfwService(unidbgProperties);
    }

    @Async
    @SneakyThrows
    public CompletableFuture<String> ttEncrypt(String key1, String body) {

        MfwServiceWorker worker;
        String data;
        if (this.unidbgProperties.isAsync()) {
            while (true) {
                if ((worker = pool.borrow(2, TimeUnit.SECONDS)) == null) {
                    continue;
                }
                data = worker.doWork(key1, body);
                pool.release(worker);
                break;
            }
        } else {
            synchronized (this) {
                data = this.doWork(key1, body);
            }
        }
        return CompletableFuture.completedFuture(data);
    }

    private String doWork(String key1, String body) {
        return mfwService.ttEncrypt(key1,body);
    }

    @SneakyThrows
    @Override public void destroy() {
        mfwService.destroy();
    }
}

