# Express Layered CRUD

<p align="center">
  <img src="https://raw.githubusercontent.com/expressjs/expressjs.com/master/images/express-facebook-share.png" alt="Express.js" width="120"/>
  <img src="https://www.prisma.io/images/og-image.png" alt="Prisma ORM" width="120"/>
  <img src="https://www.postgresql.org/media/img/about/press/elephant.png" alt="PostgreSQL" width="120"/>
</p>

Aplikasi REST API CRUD sederhana menggunakan **Express.js**, **Prisma ORM**, dan **PostgreSQL**.

---

## 🚀 Teknologi yang Digunakan

- ![Express.js](https://img.shields.io/badge/Express.js-404D59?logo=express&logoColor=white)  
  Framework web untuk Node.js, digunakan untuk membuat dan mengelola endpoint API.

- ![Prisma ORM](https://img.shields.io/badge/Prisma-2D3748?logo=prisma&logoColor=white)  
  ORM modern untuk Node.js, memudahkan interaksi dengan database.

- ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?logo=postgresql&logoColor=white)  
  Database relasional open-source untuk menyimpan data aplikasi.

- ![dotenv](https://img.shields.io/badge/dotenv-8DD6F9?logo=dotenv&logoColor=white)  
  Mengelola konfigurasi aplikasi melalui file `.env`.

- ![Nodemon](https://img.shields.io/badge/Nodemon-76D04B?logo=nodemon&logoColor=white)  
  Memudahkan pengembangan dengan auto-restart server saat ada perubahan kode.

---

## 📦 Struktur Folder

```
.env
package.json
prisma/
  schema.prisma
src/
  index.js
```

---

## ⚡ Cara Menjalankan

1. **Install dependencies:**
   ```sh
   npm install
   ```
2. **Konfigurasi database di `.env`**
3. **Generate Prisma Client:**
   ```sh
   npx prisma generate
   ```
4. **Migrasi database:**
   ```sh
   npx prisma migrate dev --name init
   ```
5. **Jalankan server:**
   ```sh
   npm start
   ```

---

## 📖 Lisensi

ISC

---

<p align="center">
  <img src="https://img.shields.io/github/license/microsoft/Express-Layered-CRUD?style=flat-square" alt="License"/>
</p>