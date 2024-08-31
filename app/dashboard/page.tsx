import Dashboard from "@/components/dashboard";
import { getSalesData, getSatasticsData } from "../actions/dashboard/actions";

export default async function Home() {
  const salesData =await getSalesData()
  const satastics = await getSatasticsData();
  return (
    <main className="">
      <Dashboard salesData={salesData} satastics={satastics}/>
      </main>
  );
}
