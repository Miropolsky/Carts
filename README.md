## Carts Dashboard

Небольшое SPA-приложение для просмотра и редактирования корзин пользователей на основе публичного API DummyJSON.

### Стек

- **React + Vite**
- **TypeScript**
- **@tanstack/react-query**
- **Zustand**
- **@emotion/styled**
- **react-router-dom**

### Как запустить

1. Перейти в папку `frontend`  
2. Установить зависимости:

   ```bash
   npm install
   ```

3. Запустить dev-сервер:

   ```bash
   npm run dev
   ```

4. Открыть приложение в браузере по адресу, который покажет Vite (обычно `http://localhost:5173`).

### Кратко об архитектуре

- **`src/api`** – обёртки над запросами к DummyJSON и React Query-хуки.  
- **`src/routes`** – страницы списка корзин и детальной карточки.  
- **`src/store`** – Zustand-хранилище для параметров списка (страница, лимит, фильтр по `userId`).  
- **`src/components`** – переиспользуемые UI-компоненты (таблица, кнопки, карточки, layout).  
- **`src/styles`** – тема и глобальные стили на базе Emotion.  
