# โปรแกรมแปลงเสียงเป็นข้อความ (Speech-to-Text)

โปรแกรมบนเว็บสำหรับแปลงเสียงพูดเป็นข้อความแบบเรียลไทม์ สร้างขึ้นด้วย React, TypeScript, และ Vite

## คุณสมบัติ

-   **แปลงเสียงเป็นข้อความ:** บันทึกเสียงจากไมโครโฟนและแสดงผลเป็นข้อความทันที
-   **รองรับหลายภาษา:** สามารถเลือกภาษาที่ต้องการจะพูดได้
-   **คัดลอกข้อความ:** มีปุ่มสำหรับคัดลอกข้อความที่แปลงแล้วไปยังคลิปบอร์ด
-   **การออกแบบที่เรียบง่าย:** ใช้ Tailwind CSS สำหรับการออกแบบที่สะอาดตาและใช้งานง่าย

## เทคโนโลยีที่ใช้

-   **Frontend:** React.js, TypeScript
-   **Build Tool:** Vite
-   **Styling:** Tailwind CSS
-   **Icons:** Lucide React

## การติดตั้งและเริ่มต้นใช้งาน

### สิ่งที่ต้องมี

-   [Node.js](https://nodejs.org/) (เวอร์ชัน 18.x หรือสูงกว่า)
-   [npm](https://www.npmjs.com/) หรือ [yarn](https://yarnpkg.com/)

### ขั้นตอนการติดตั้ง

1.  **Clone a repository:**
    ```bash
    git clone <your-repository-url>
    cd Speech_to_text-main
    ```

2.  **ติดตั้ง Dependencies:**
    ```bash
    npm install
    ```
    (หรือ `yarn install` หากคุณใช้ Yarn)

### การรันโปรเจค (Development Mode)

รันคำสั่งต่อไปนี้เพื่อเปิด Development Server:
```bash
npm run dev
```
จากนั้นเปิดเบราว์เซอร์ไปที่ `http://localhost:5173` (หรือ Port อื่นที่ Vite แสดงใน Terminal)

## คำสั่ง (Scripts) ที่มีให้ใช้

-   `npm run dev`: รันแอปพลิเคชันในโหมดพัฒนา (Development Mode)
-   `npm run build`: สร้าง (Build) โปรเจคสำหรับนำไปใช้งานจริง (Production)
-   `npm run lint`: ตรวจสอบคุณภาพของโค้ดด้วย ESLint
-   `npm run preview`: พรีวิวเวอร์ชันที่ Build แล้ว


## batfile เพื่อใช้งาน บันทึกในไฟล์ "stt.bat"

```bash
@echo off
cd /d "C:\tmp\code\STT2_ok\Speech_to_text"

:: ตรวจสอบว่ามี Chrome ติดตั้งอยู่หรือไม่ ถ้าไม่มี ให้ใช้ Edge หรือระบุพาธของ Chrome เอง
IF EXIST "C:\Program Files\Google\Chrome\Application\chrome.exe" (
    start "" "C:\Program Files\Google\Chrome\Application\chrome.exe" "http://localhost:5173"
) ELSE IF EXIST "C:\Program Files (x86)\Google\Chrome\Application\chrome.exe" (
    start "" "C:\Program Files (x86)\Google\Chrome\Application\chrome.exe" "http://localhost:5173"
) ELSE (
    :: ถ้าไม่เจอ Chrome ในตำแหน่งมาตรฐาน ให้ลองเปิดด้วยเบราว์เซอร์เริ่มต้นของระบบ
    start "" "http://localhost:5173"
    echo Chrome not found in standard paths. Opening with default browser.
)

npm run dev
pause

```
