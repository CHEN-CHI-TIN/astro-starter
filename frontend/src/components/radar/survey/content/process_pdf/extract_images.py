import fitz  # PyMuPDF
import os

# 指定文件夾路径
folder_path = '../hypecycles_pdf'

# 遍歷文件夾中的所有PDF文件
for file in os.listdir(folder_path):
    if file.endswith(".pdf"):
        file_path = os.path.join(folder_path, file)

        # 打開PDF文件
        doc = fitz.open(file_path)
        extracted = False

        # 遍歷每個頁面直到找到第一張圖片
        for page in doc:
            # 提取頁面中的圖像
            image_list = page.get_images(full=True)
            if image_list:
                # 提取第一張圖片
                xref = image_list[0][0]
                pix = fitz.Pixmap(doc, xref)
                img_name = os.path.splitext(os.path.basename(file_path))[0] + ".png"
                img_path = os.path.join(folder_path, img_name)
                # 保存圖片
                if pix.n - pix.alpha < 4:  # 如果是彩色或灰度圖像
                    pix.save(img_path)
                else:  # 如果是CMYK：轉換為RGB
                    pix1 = fitz.Pixmap(fitz.csRGB, pix)
                    pix1.save(img_path)
                    pix1 = None
                pix = None
                extracted = True
                break

        doc.close()

        # 打印保存信息或未找到圖片的信息
        if extracted:
            print(f"Image saved as {img_path}")
        else:
            print(f"No image found in {file_path}")

# import fitz  # PyMuPDF
# import os

# # 指定文件夾路径
# folder_path = '../hypecycles_pdf'

# # 遍歷文件夾中的所有PDF文件
# for file in os.listdir(folder_path):
#     if file.endswith(".pdf"):
#         file_path = os.path.join(folder_path, file)

#         # 打開PDF文件
#         doc = fitz.open(file_path)
#         extracted = False
#         image_count = 0  # 圖片計數器

#         # 遍歷每個頁面直到找到第二張圖片
#         for page in doc:
#             # 提取頁面中的圖像
#             image_list = page.get_images(full=True)
#             for img in image_list:
#                 image_count += 1  # 更新圖片計數器
#                 if image_count == 2:  # 當遇到第二張圖片時
#                     xref = img[0]
#                     pix = fitz.Pixmap(doc, xref)
#                     img_name = os.path.splitext(os.path.basename(file_path))[0] + "_extra.png"
#                     img_path = os.path.join(folder_path, img_name)
#                     # 保存圖片
#                     if pix.n - pix.alpha < 4:  # 如果是彩色或灰度圖像
#                         pix.save(img_path)
#                     else:  # 如果是CMYK：轉換為RGB
#                         pix1 = fitz.Pixmap(fitz.csRGB, pix)
#                         pix1.save(img_path)
#                         pix1 = None
#                     pix = None
#                     extracted = True
#                     break
#             if extracted:  # 如果已經找到並提取了第二張圖片
#                 break

#         doc.close()

#         # 打印保存信息或未找到圖片的信息
#         if extracted:
#             print(f"Second image saved as {img_path}")
#         else:
#             print(f"No second image found in {file_path}")

