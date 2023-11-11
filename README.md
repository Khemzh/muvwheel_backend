# Topic of content

- [setup](#setup)
- [workflows](#workflows)
- [story point](#story-point)
---
<a id="setup"></a>
## setup
 1. เพื่อให้ชีวิตง่ายไปใช้ github desktop
 2. clone repo backend เลือกเป็น branch product
 3. เลือก branch dev  
    ![image](https://github.com/Khemzh/muvwheel_backend/assets/65082010/8f291ef7-c676-4027-bd38-f68f4c86fc52)  
 5. กด new branch แล้วตั้งชื่อของตัวเอง **(เลือก branch dev ด้วย)**
 6. กด publish branch
    ![image](https://github.com/Khemzh/muvwheel_backend/assets/65082010/35c2452b-7b1a-4278-8b5f-6c5a091e3364)
---
<a id="workflows"></a>
## workflows
หลังจากที่ทำโค้ดเสร็จแล้วหรือต้องการจะเอา branch ตัวเองเข้า branch dev
 1. commit branch ตัวเอง  
    1.1. เข้าไปที่ github desktop ดูให้ดีว่าอยู่ใน branch ตัวเอง
         ![image](https://github.com/Khemzh/muvwheel_backend/assets/65082010/c94a75f2-5652-489a-b7bb-789a9427f89c)  

    1.2. เขียน summary ของโค้ดที่ตัวเองทำ (หา emoji มาใส่เพื่อให้โดดเด่นด้วย [gitmoji](https://gitmoji.dev/) )
         ![image](https://github.com/Khemzh/muvwheel_backend/assets/65082010/0b84ba49-f4df-492b-90ad-d271ac6c31e6)  
    1.3 กด commit
 2. อัพเดท dev ให้เป็นปัจจุบัน
    2.1 เปลี่ยน branch เป็น dev  
        ![image](https://github.com/Khemzh/muvwheel_backend/assets/65082010/6ec349ce-3427-4412-a63e-b11b99fe775a)  
    2.2 กด fetch origin หรือ pull เพื่ออัพเดท  
        ![image](https://github.com/Khemzh/muvwheel_backend/assets/65082010/0bc2c8f1-28ba-4d80-a85f-20600b29ad27)  
    2.3 สลับ branch ให้เป็นของตัวเอง
 3. ทำ FastForward เพื่อทำให้โค้ดใน branch ตัวเองอัพเดทตาม dev
    3.1 เข้า terminal พิม
    ```bash
    git merge --ff dev
    ```
 4. PR bramch ตัวเอง เข้า branch dev
    4.1 ที่ GitHub desktop กด Create pull/request
        ![image](https://github.com/Khemzh/muvwheel_backend/assets/65082010/4ade263c-d05b-4435-b1a1-f3b9f89411bd)  
    4.2 จะเด้งไปหน้า web GitHub ให้เลือก branch ตัวเอง เข้า branch dev และกด creat pull request
        ![image](https://github.com/Khemzh/muvwheel_backend/assets/65082010/a280633d-169d-4da4-a4ea-796db0f7224e)
 5. รอ Adviser มากด commit (แจ้ง PM ก็ได้) 
---
<a id="story-point"></a>
## story point
1 half hour (30 min.)  
2 few minutes (0:30 - 1:30)  
3 few hours (3 hours)  
5 half-day (4:30)  
8 a day (8 hours)  
13 2 days (16 hours)  


