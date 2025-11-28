# entities

Один объект = одна папка (User, Product, Order, Article, Comment и т.д.)

Пример папки: entities/product/

product/
├─ ui/ <- как выглядит товар
│ ├── ProductCard.tsx <- карточка товара в каталоге
│ ├── ProductCard.module.css
│ ├── ProductGallery.tsx <- галерея фоток
│ ├── ProductGallery.module.css
│ └── index.ts <- `export { ProductCard } from './ProductCard'`, `export { ProductGallery } from './ProductGallery'`
│
├─ model/
│ ├── types.ts <- interface Product { id: string; title: string; price: number; ... }
│ ├── store.ts <- если используем Zustand/Redux - слайс продукта
│ └── selectors.ts
│
└─ lib/
└── normalize-product.ts <- если с бэка приходит криво - приводим к нашему типу

Другие примеры папок:
entities/user/
entities/cart-item/

Правило: сюда НЕЛЬЗЯ класть кнопки «Добавить в корзину», «Лайкнуть», формы - это уже features
