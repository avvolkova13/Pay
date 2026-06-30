import { CheckoutPage } from "@/components/CheckoutPage";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { getDictionary } from "@/i18n";

export default function Page() {
  const dictionary = getDictionary("en");

  return (
    <>
      <Header dictionary={dictionary} locale="en" routeKey="checkout" />
      <CheckoutPage dictionary={dictionary} />
      <Footer dictionary={dictionary} locale="en" />
    </>
  );
}
