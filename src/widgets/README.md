# widgets / components

Это уже «кирпичи» страницы: шапка, подвал, сайдбар, блок статистики и т.д.

Примеры реальных виджетов:
widgets/header/
widgets/footer/
widgets/sidebar/
widgets/product-list/
widgets/cart-drawer/
widgets/dashboard-stats/

Пример структуры Header:

header/
└─ ui/
├── Header.tsx <- собирает всё вместе
├── Logo.tsx
├── DesktopMenu.tsx
└── MobileMenu.tsx

Внутри Header можно использовать:

- shared/ui
- entities
- features

НО НЕЛЬЗЯ импортировать другие widgets
