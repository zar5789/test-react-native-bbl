# Test React Native – BBL

แอปแคตตาล็อกสินค้าสำหรับแบบทดสอบ React Native ดึงรายการสินค้าจาก
[Fake Store API](https://fakestoreapi.com) มีหน้ารายละเอียดของแต่ละสินค้า และมีรายการ Favorites ที่ใช้ร่วมกันทั้งแอป

## ฟีเจอร์

- **รายการสินค้า:** แสดงด้วย `FlatList` มีรูป ชื่อ และราคา ดึงลงเพื่อรีเฟรช (pull-to-refresh) ได้
- **รายละเอียดสินค้า:** โหลดจาก `GET /products/{id}`
- **Favorites:** เพิ่มหรือลบได้จากหน้ารายละเอียด ดูทั้งหมดได้ที่ tab Favorites (มีตัวเลขบอกจำนวน) และลบออกจากรายการได้
- **เก็บข้อมูลถาวร:** Favorites บันทึกลง AsyncStorage ปิดแอปแล้วเปิดใหม่ข้อมูลยังอยู่
- **Animation:** ไอคอนหัวใจเด้งตอนกด favorite
- มีหน้าสถานะ loading, error (กดลองใหม่ได้) และหน้าว่าง ครบทุกหน้า

## Tech stack

- Expo SDK 58 · React Native 0.88 · TypeScript
- React Navigation 7: native stack (Tabs → Product Detail) และ bottom tabs (Products, Favorites)
- Zustand ใช้ middleware `persist` เก็บ state ของ Favorites ลง AsyncStorage

## วิธีติดตั้งและรัน

สิ่งที่ต้องมี: Node.js 20 ขึ้นไป และมีอย่างใดอย่างหนึ่งคือแอป **Expo Go** บนมือถือ, Android emulator หรือ iOS simulator

```bash
npm install
npm start
```

URL ของ API ตั้งค่าไว้ที่ `EXPO_PUBLIC_API_URL` ในไฟล์ `.env`

จากนั้นสแกน QR code ด้วย Expo Go หรือกด `a` เพื่อเปิด Android, `i` เพื่อเปิด iOS, `w` เพื่อเปิดบนเว็บ

ตรวจ type:

```bash
npx tsc --noEmit
```

## โครงสร้างโปรเจกต์

```
App.tsx                    จุดเริ่มต้นของแอป เรียก src/app/_layout
src/
  app/                     รวมทุกหน้าและ layout ไว้ที่เดียว
    _layout.tsx            Root layout: SafeAreaView, NavigationContainer, stack
    (tabs)/_layout.tsx     Bottom tabs (Products, Favorites)
    (tabs)/products.tsx    หน้ารายการสินค้า
    (tabs)/favorites.tsx   หน้ารายการ Favorites
    product/[id].tsx       หน้ารายละเอียดสินค้า
  api/products.ts          ฟังก์ชันเรียก Fake Store API (base URL จาก EXPO_PUBLIC_API_URL)
  hooks/useProducts.ts     useProducts (รายการ + รีเฟรช) และ useProduct (สินค้าชิ้นเดียว)
  store/favoritesStore.ts  Zustand store ที่บันทึกลง AsyncStorage
  navigation/types.ts      Type ของ route params
  components/              Header, ProductCard, FavoriteButton, StateView
  types/product.ts         Type ของ Product
```

## หมายเหตุ

- Safe area จัดการที่ `SafeAreaView` ใน root layout จุดเดียว navigator แต่ละตัวปิด header และ inset ของตัวเองไว้
  แล้วทุกหน้าใช้ `Header` component ร่วมกัน padding จึงไม่ซ้อนกัน
- ชื่อไฟล์ใน `src/app` ตั้งตามแบบ Expo Router เพื่อให้หาง่าย แต่ยังลงทะเบียนหน้าเองด้วย React Navigation
- Favorites เก็บข้อมูลสินค้าทั้งชิ้นไว้ หน้า Favorites จึงแสดงได้โดยไม่ต้องเรียก API ซ้ำ
