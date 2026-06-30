import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { HeroPlaygroundPage } from "@/components/HeroPlaygroundPage";
import { getDictionary } from "@/i18n";

export const metadata: Metadata = {
  title: "Hero Playground | PAYWAYS",
  description: "Experimental PAYWAYS hero playground."
};

export default function Page() {
  const dictionary = getDictionary("ru");

  return (
    <>
      <Header dictionary={dictionary} locale="ru" routeKey="home" />
      <HeroPlaygroundPage dictionary={dictionary} locale="ru" />
    </>
  );
}
