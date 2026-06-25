import { CheckoutDemo } from "@/components/CheckoutDemo";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { getDictionary } from "@/i18n";

export default function Page() {
  const dictionary = getDictionary("en");

  return (
    <>
      <Header dictionary={dictionary} locale="en" routeKey="checkout" />
      <CheckoutDemo dictionary={dictionary} />
      <Footer dictionary={dictionary} locale="en" />
    </>
  );
}
