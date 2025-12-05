'use client';

import Link from 'next/link';
import { Success } from './ui/icons/Success';

export default function FinishPage() {
  return (
    <section className='h-[100vh] px-4 pt-6 pb-10 bg-(--color-white) flex flex-col'>
      <Success className='mt-[100px] mb-5 self-center' />
      <header className='mb-8 flex flex-col gap-3'>
        <h1 className='font-medium text-2xl leading-[1.2] text-center align-middle text-(--color-black)'>
          Поздравляем!
        </h1>
        <p className='font-normal text-[18px] leading-[1.2] text-center text-(--color-black)'>
          Регистрация прошла успешно
        </p>
      </header>

      <Link
        href='/'
        className='block text-center w-full border-0 rounded-lg bg-primary text-white cursor-pointer font-medium text-[18px] py-4 px-[24px] leading-[1.2]'
      >
        Далее
      </Link>
    </section>
  );
}
