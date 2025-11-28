# public/

Сюда кладём ТОЛЬКО файлы, которые должны быть доступны по прямому URL  
и которые НЕ нужно оптимизировать/обрабатывать бандлером.

### Разрешено:

- `favicon.ico`, `apple-touch-icon.png`, прочие иконки для браузера
- `robots.txt`
- `sitemap.xml`
- `manifest.json`
- Open Graph картинки (`/og/`, `/social-preview.jpg` и т.д.)
- Шрифты, если грузим их вручную через `@font-face`

### Запрещено:

- Логотипы -> `src/shared/assets/images/`
- Иконки -> `src/shared/ui/icons/` (как React-компоненты) или `src/shared/assets/icons/`
- Фото товаров, аватары, иллюстрации -> CDN + next/image
- Любые SVG, которые используются в коде -> `src/shared/assets/` или как компонент

Правило:  
Если ты импортируешь файл через `import` -> он НЕ в `public/`.  
Если просто пишешь `<img src="/logo.svg">` -> тогда и только тогда в `public/`.
