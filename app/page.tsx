import { MessageBubble } from "@/widgets/msgBubble/index";

export default function Home() {
  const images = [
    "https://i.pinimg.com/1200x/0c/fa/e5/0cfae520fc4a9845b8f8ae4b694205e7.jpg",
    "https://i.pinimg.com/1200x/91/1b/db/911bdb7dafb4248a3d2a38133581e221.jpg",
    "https://i.pinimg.com/736x/97/cd/10/97cd103a385ff454a346367afe96b243.jpg",
  ];

  return (
    <div className="h-screen overflow-y-scroll p-8 bg-neutral-900">
      <MessageBubble
        content="Lorem ipsum is a dummy or placeholder text commonly used in graphic design, publishing, and web development."
        answerContent="Lorem ipsum is a dummy or placeholder text commonly used in graphic design, publishing, and web development."
        fileName="Lorem_ipsum_is_a_dummy_or_placeholder_text.png"
        time="12:30"
        type="sent"
        images={images}
        size={10.5}
        previewSrc={images[0]}
        person="Someone"
        isLoading={false}
      />
    </div>
  );
}
