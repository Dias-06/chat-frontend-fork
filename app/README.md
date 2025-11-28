# app

Здесь НЕ пишем логику - только собираем готовые куски.

Правило очень простое:
В файле page.tsx можно импортировать ТОЛЬКО:

- widgets/
- features/
- shared/
- entities/

Примеры правильных страниц:

app/profile/page.tsx
app/profile/page.module.css

app/product/[id]/page.tsx
app/product/[id]/page.module.css

Пример кода страницы (app/dashboard/page.tsx):

```tsx
import { Header } from '@/widgets/header';

export default function DashboardPage() {
  return <></>;
}
```

Если хочется положить сюда какую-то логику - выносить в features или widgets
