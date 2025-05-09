# 🛠️ API de Gestión Comercial - NestJS + Prisma

Una API RESTful desarrollada con **NestJS**, que permite registrar, consultar y analizar **comerciantes**, **usuarios** y **establecimientos**, utilizando **PostgreSQL**, **Prisma ORM**, **Docker**, **JWT**, y documentación interactiva con **Swagger**.

---

## 🚀 Instalación rápida

1. **Clona el repositorio**

```bash
git clone https://github.com/jorge7712051/api-commerce.git
cd api-commerce

```

2. **Instale las dependencias**

```bash
npm install
```

3. **Valide el archivo `.env`**

> ⚠️ **Nota:** Si bien el archivo `.env` no se recomienda subir, para esta prueba se subira con variables temporales.  
> ⚠️ **Nota:** Valide que los puertos **DB_PORT** y **SERVICE_PORT** esten libres de no ser asi cambie sus valores en el archivo `.env`.

4. **Levanta la app con Docker**

```bash
docker-compose up -d
```

> Esto levanta:  
> 🐘 PostgreSQL  
> 🚀 API NestJS en modo desarrollo

5. **Importe la coleccion de postman**

Si esta usando Postman importe el archivo **COMMERCE-TEST.postman_collection.json**.

---

## 🧪 Endpoints

Una vez levantado, accedé a la documentación Swagger:

📘 [http://localhost:3001/api](http://localhost:3001/api)

---

## 🔐 Autenticación JWT

Login simulado:

```http
POST /auth/login
Content-Type: application/json

{
    "email":"admin@crm.com",
    "password":"admin123"
}
```

> Devuelve un token JWT que se puede usar en Swagger con el botón **Authorize**.

---

## 🧠 Stack principal

- [NestJS](https://nestjs.com/)
- [PrismaOrm](https://www.prisma.io/)
- [PostgreSQL](https://www.postgresql.org/)
- [Swagger](https://swagger.io/)
- [Docker](https://www.docker.com/)
- [JWT](https://jwt.io/)

---

## 📁 Estructura del proyecto (simplificada)

```
src/
├── auth/
├── config/
├── prisma/
├── data/
├── modules/
├── shared/
├── main.ts
├── app.module.ts
.env
docker-compose.yml
Dockerfile
```

---

## ✅ TODOs

- [x] CRUD de comerciantes
- [x] Seguridad con JWT
- [x] Docker y migraciones automáticas

---

## 👨‍⚕️ Autor

Desarrollado por Jorge leonardo Correa.

---

## 📝 Licencia

Este proyecto está bajo la licencia MIT.
