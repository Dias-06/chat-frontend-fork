# MsgBubble

— универсальный компонент «пузыря сообщения» для чата, который умеет отображать: текст, картинки, файлы, голосовые сообщения, ответы, пересланные сообщения, статус доставки (отправляется / доставлено / прочитано).

главный компонент — MsgBubble.tsx — это контейнер, который:

- определяет тип сообщения
- рендерит нужные ноды
- добавляет статус сообщения

обязательные пропсы:

- time: время (строка)
- type: отправлено (sent) или получено (recieved)

## пример со всеми доступными пропсами

```tsx
<MessageBubble
  content="Lorem ipsum is a dummy or placeholder text commonly used in graphic design, publishing, and web development."
  answerContent="Lorem ipsum is a dummy or placeholder text commonly used in graphic design, publishing, and web development."
  fileName="Lorem_ipsum_is_a_dummy_or_placeholder_text.png"
  forwardedFrom="Someone"
  avatarSrc="./img.png"
  time="12:30"
  type="sent"
  images={["./img.png", "./img-2.png"]}
  size={1048576} // в байтах
  previewSrc="./img.png"
  person="Someone"
  status="read"
  audioSrc="./audio.mp3"
  audioDuration="1:13"
  playerStatus="idle"
  stopLoading={yourFunc}
  onClick={yourFunc}
  isLoading={false}
/>
```

## ноды

### AnswerNode.tsx — ui отвеченного сообщения

используется вместе с TextMessage или ImagesMessage

```tsx
interface answerNodeProps {
  person: string; // от кого
  content: string; // сообщение
  previewSrc?: string; // если ответ на картинку/картинки
  type: "sent" | "recieved";
  classFix: string; // определяется в сборщике MessageBubble
}
```

### FileMessage — сообщение с файлом

```tsx
interface FileMessageProps {
  fileName: string; // название файла
  size: number; // размер файла в байтах
  time: string;
  previewSrc?: string | null; // превью, если картинка
  isLoading?: boolean; // статус загрузки
  type: "sent" | "recieved";
  sentIcon: ReactNode; // определяется в сборщике MessageBubble
  stopLoading: () => void; // клик на файл в процессе загрузки - только если isLoading
  onClick: () => void; // клик на отправленный файл
}
```

### ForwardedNode — ui пересланного сообщения

используется вместе с TextMessage или ImagesMessage

```tsx
interface ForwardedNodeProps {
  avatarSrc: string; // аватар автора пересланного сообщения
  forwardedFrom: string; // имя автора пересланного сообщения
  type: "sent" | "recieved";
  classFix: string; // определяется в сборщике MessageBubble
}
```

### ImagesMessage — сообщение с картинкой/картинками

```tsx
interface ImagesNodeProps {
  images: string[]; // ['./img.png'] или ['./img.png', './img-2.png', ...]
  time: string;
  sentIcon: ReactNode; // определяется в сборщике MessageBubble
}
```

### ImagesNode — ui картинки

используется вместе с TextMessage

```tsx
interface ImagesNodeProps {
  images: string[]; // ['./img.png'] или ['./img.png', './img-2.png', ...]
}
```

### TextMessage — обычное текстовое сообщение

```tsx
interface TextMessageProps {
  content: string; // текст сообщения
  time: string;
  type: "sent" | "recieved";
  sentIcon: ReactNode; // определяется в сборщике MessageBubble
  classFix: string; // определяется в сборщике MessageBubble
}
```

### VoiceMessage — голосовое сообщение

сам воспроизводит аудио, но не хранит у себя статус плеера — статус принимает через пропсы

```tsx
type PlayerStatus = "idle" | "loading" | "playing" | "paused";

interface VoiceMessageProps {
  status: PlayerStatus; // текущий статус плеера (управляется родителем)
  audioSrc: string; // URL аудиофайла
  duration: string; // строка с длительностью ("0:23")
  waveform: number[]; // массив чисел высоты столбцов от 2 до 17
  time: string;
  type: "sent" | "recieved";
  sentIcon?: React.ReactNode; // определяется в сборщике MessageBubble

  onPlay: () => void; // вызывается при нажатии play
  onPause: () => void; // вызывается при pause
  onStop: () => void; // вызывается когда аудио закончилось
}
```
