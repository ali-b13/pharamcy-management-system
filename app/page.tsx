import Dashboard from "@/components/dashboard";
import NavBar from "@/components/nav-bar";
import { getSalesData, getSatasticsData } from "./actions/dashboard/actions";

export default async function main() {
  const salesData =await getSalesData()
  const satastics = await getSatasticsData();
  console.log(satastics,'info')
  return (
    <main className="">
      <NavBar/>
      <Dashboard salesData={salesData} satastics={satastics}/>
    </main>
  );
}
