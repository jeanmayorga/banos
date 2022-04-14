import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";
import { formatSlug } from "utils";
import { NewsPage } from "client/modules/mainpage";
import { getOneNew } from "client/services";

export function Page({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return <NewsPage data={data} />;
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const slug = formatSlug(context.params?.slug);
  const data = await getOneNew(slug);

  return { props: { data } };
}

export default Page;
