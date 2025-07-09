import os
import sys
import shutil
from PyQt5.QtCore import Qt
from PyQt5.QtGui import QPixmap, QPainter, QKeySequence, QPalette, QColor
from PyQt5.QtWidgets import QApplication, QMainWindow, QPushButton, QSlider, QLabel, QVBoxLayout, QWidget, QFileDialog, \
    QHBoxLayout, QShortcut


class ImageEditor(QMainWindow):
    def __init__(self):
        super().__init__()

        self.background_pixmap = None
        self.cutout_pixmap = None
        self.bg_path = None
        self.slice_path = None
        self.bg_imgs = []
        self.slice_imgs = []
        self.imgs_index = 0

        self.initUI()

    def initUI(self):
        self.setWindowTitle('Image Editor')
        screen_geometry = QApplication.desktop().screenGeometry()
        window_geometry = self.geometry()
        x = (screen_geometry.width() - window_geometry.width()) // 2
        y = (screen_geometry.height() - window_geometry.height()) // 2

        self.setGeometry(x, y, 900, 650)  # Adjusted window size

        self.central_widget = QWidget()
        self.setCentralWidget(self.central_widget)

        self.layout = QVBoxLayout()
        self.central_widget.setLayout(self.layout)

        # Custom button styles
        self.load_bg_path = QPushButton('加载图片文件夹')
        self.load_bg_path.setStyleSheet(
            "background-color: #4CAF50; color: white; font-size: 14px; border-radius: 5px; padding: 10px;")
        self.load_bg_path.clicked.connect(self.load_background_image_paths)

        self.export_btn = QPushButton('保存图片')
        self.export_btn.setStyleSheet(
            "background-color: #2196F3; color: white; font-size: 14px; border-radius: 5px; padding: 10px;")
        self.export_btn.clicked.connect(self.export_image)

        # Layout for buttons
        button_layout = QHBoxLayout()
        button_layout.addWidget(self.load_bg_path)
        button_layout.addWidget(self.export_btn)

        # Add button layout to main layout
        self.layout.addLayout(button_layout)

        # Shortcut for exporting image
        self.export_image_shortcut = QShortcut(QKeySequence('Ctrl+S'), self)
        self.export_image_shortcut.activated.connect(self.export_image)

        # Slider for translation
        self.slider = QSlider(Qt.Horizontal)
        self.slider.setMinimum(0)
        self.slider.setMaximum(300)
        self.slider.setValue(0)
        self.slider.setTickInterval(10)
        self.slider.setTickPosition(QSlider.TicksBelow)
        self.slider.valueChanged.connect(self.update_cutout_translation)

        self.layout.addWidget(self.slider)

        # Label for current translation value
        self.distance_label = QLabel('移动距离X: 0')
        self.layout.addWidget(self.distance_label)

        # Image display area
        self.image_label = QLabel()
        self.layout.addWidget(self.image_label)

        # Style updates to improve appearance
        self.setStyleSheet("background-color: #f0f0f0;")

    def load_background_image_paths(self):
        options = QFileDialog.Options()
        folder_path = QFileDialog.getExistingDirectory(self, 'Select Directory', '', options=options)

        if folder_path:
            self.bg_path = folder_path
            self.slice_path = self.bg_path.replace("bg", "que")
            self.bg_imgs = [img for img in os.listdir(self.bg_path) if img.endswith(('png', 'jpg', 'jpeg', 'bmp'))]
            self.slice_imgs = [img for img in os.listdir(self.slice_path) if
                               img.endswith(('png', 'jpg', 'jpeg', 'bmp'))]

            if not self.bg_imgs or not self.slice_imgs:
                print("未找到有效的图片文件")
                return

            self.imgs_index = 0
            self.update_display()

    def update_cutout_translation(self):
        if self.cutout_pixmap and self.background_pixmap:
            x_translation = self.slider.value()
            self.distance_label.setText(f'移动距离X : {x_translation}')
            self.update_display()

    def update_display(self):
        if self.bg_path and self.bg_imgs:
            self.background_pixmap = QPixmap(os.path.join(self.bg_path, self.bg_imgs[self.imgs_index]))
            self.cutout_pixmap = QPixmap(os.path.join(self.slice_path, self.slice_imgs[self.imgs_index]))

            result_pixmap = self.background_pixmap.copy()
            painter = QPainter(result_pixmap)

            if self.cutout_pixmap:
                x_translation = self.slider.value()
                y = (self.background_pixmap.height() - self.cutout_pixmap.height()) // 2
                painter.drawPixmap(x_translation, y, self.cutout_pixmap)

            painter.end()
            self.image_label.setPixmap(result_pixmap)

    def export_image(self):
        if not self.cutout_pixmap or not self.bg_path:
            return

        x_translation = self.slider.value()
        newdirname = self.bg_path.replace("bg", "newbg")

        if not os.path.exists(newdirname):
            os.mkdir(newdirname)

        output_file = os.path.join(newdirname, f"{x_translation}_{self.bg_imgs[self.imgs_index]}")
        shutil.copy(os.path.join(self.bg_path, self.bg_imgs[self.imgs_index]), output_file)
        print(f"已保存：{output_file}")


if __name__ == '__main__':
    app = QApplication(sys.argv)
    window = ImageEditor()
    window.show()
    sys.exit(app.exec_())
