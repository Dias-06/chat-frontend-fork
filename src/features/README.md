# features

Это то, что пользователь нажимает и что-то происходит.

Самые частые примеры:
features/add-to-cart/ <- кнопка «В корзину» + логика добавления
features/like-article/ <- кнопка лайка + отправка на сервер
features/auth-by-email/ <- вся форма логина по почте
features/search-products/ <- строка поиска + результаты
features/create-review/ <- форма отзыва

Структура одной фичи (на примере add-to-cart):

add-to-cart/
├─ ui/
│ ├── AddToCartButton.tsx <- сама кнопка с иконкой корзины
│ └── AddToCartButton.module.css
│
├─ model/
│ ├── use-add-to-cart.ts <- хук
│ └── cart-store.ts <- если локальный zustand/redux
│
└─ lib/
└── validate-quantity.ts

Главное правило:

- Можно использовать shared и entities
- Нельзя использовать widgets и другие features
