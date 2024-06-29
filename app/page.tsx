"use client";

import React, { useState, useEffect, useContext } from "react";
import { MainchainContext } from "../context/Mainchain";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  const { currentAccount, connectWallet, disconnectWallet } = useContext(MainchainContext);
  const [logs, setLogs] = useState<string[]>([]);
  const [roles, setRoles] = useState([]);
  const [activeTab, setActiveTab] = useState("1");
  const [isLoading, setIsLoading] = useState(true);
  const [errMessage, setErrMessage] = useState("");

  return (
    <>
      <header className="flex items-center justify-between h-16 px-4 border-b md:px-6">
        <nav className="flex items-center gap-6 text-lg font-medium md:gap-5 md:text-sm lg:gap-6">
          <Link
            className="flex items-center gap-2 text-lg font-semibold md:text-base"
            href="#"
          >
            <span>Drug Supplychain</span>
          </Link>
          <Link className="font-bold" href="#">
            All reports
          </Link>
          <Link className="text-gray-500 dark:text-gray-400" href="#">
            My reports
          </Link>
          <Link className="text-gray-500 dark:text-gray-400" href="#">
            Auctions
          </Link>
          <Link className="text-gray-500 dark:text-gray-400" href="/create">
            Create Report
          </Link>
        </nav>

        {!currentAccount && (
          <Button onClick={() => connectWallet()}>Connect Wallet</Button>
        )}
        {currentAccount && (
          <Button
            onClick={() => disconnectWallet()}
            size="sm"
            variant="outline"
          >
            Connected
          </Button>
        )}
      </header>

     
    </>
  );
}
