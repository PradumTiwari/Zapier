"use client"
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { BACKEND_URL } from '../config'
import LinkButton from '@/component/Button/LinkButton'
import { useRouter } from 'next/navigation'
import { DarkButton } from '@/component/Button/DarkButton'
const Page = () => {
  interface Zap {
    id: string;
    triggerId: string;
    userId: number;
    actions: {
      id: string;
      zapId: string;
      actionId: string;
      sortingOrder: number;
      type: {
        id: string;
        name: string;
      };
    }[];
    trigger: {
      id: string;
      zapId: string;
      triggerId: string;
      type: {
        id: string;
        name: string;
      };
    };
  }

  const [zap, setZap] = useState<Zap[]>([]);
  const [loading, setLoading] = useState(true);
  const router=useRouter();
  const zapload = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found in localStorage");
        setLoading(false);
        return;
      }

      const res = await axios.get(`${BACKEND_URL}/api/v1/zap`, {
        headers: {
          Authorization: `Bearer ${token}`, // Ensure proper formatting
        },
      });

      setZap(res.data.zaps);
      console.log("Zaps Loaded", res.data.zaps); // Log after update
    } catch (error) {
      console.error("Error loading zaps:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    zapload();
  }, []);

  return(
    <div>
  <div className="flex justify-center pt-8">
  <div className="max-w-screen-lg w-full">
    <div className="flex justify-between pr-8">
      <div className="text-2xl font-bold">
        My Zaps
      </div>
      <DarkButton onClick={() => {
        router.push('/zap/create')
      }}>
        Create
      </DarkButton>
    </div>
  </div>
</div>
{loading ? "Loading..." : <div className="flex justify-center"> <ZapTable zap={zap} /> </div>}
</div>
        );
};



function ZapTable({ zap }: { zap: Zap[]} ) {
  const router = useRouter();

  return <div className="p-8 max-w-screen-lg w-full">
      <div className="flex">
              <div className="flex-1">Name</div>
              <div className="flex-1">Last Edit</div>
              <div className="flex-1">Running</div>
              <div className="flex-1">Go</div>
      </div>
      {zap.map((z) => (

        <div key={z.id} className="flex border-b border-t py-4">
          <div className="flex-1">{z.trigger.type.name}  {z.actions.map((x) => x.type.name).join(" ")}</div>
          <div className="flex-1">{z.id}</div>
          <div className="flex-1">Nov 13, 2023</div>
          <div className="flex-1">
          <LinkButton onClick={() => router.push(`/zap/${z.id}`)}>Go</LinkButton>
          </div>
      </div>
      ))}
  </div>
}
export default Page;
