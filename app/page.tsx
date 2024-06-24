"use client";

import React, { useState, useEffect, useContext } from "react";
import { MainchainContext } from "../context/MainChain";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  const { currentAccount, connectWallet } = useContext(MainchainContext);
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

      <main className="grid grid-cols-1 gap-4 p-4 md:grid-cols-2 lg:grid-cols-3 lg:p-6">
        <div>
          {state.networkId === 4 || state.networkId >= 5 ? (
            <Alert style={{ textAlign: "center" }} color="success">
              Active Account: {state.account}, --- Network ID: {state.networkId}
            </Alert>
          ) : (
            <Alert style={{ textAlign: "center" }} color="danger">
              You should use MetaMask and pick Rinkeby Network to be able to use
              contract functionality.
            </Alert>
          )}
          <h1 className="display-1" style={{ marginLeft: "80px" }}>
            <span role="img" aria-label="stars">
              {" "}
              💊💉{" "}
            </span>
            Drug'nDrugz
          </h1>
          <Nav tabs style={{ justifyContent: "center" }}>
            <NavItem>
              <NavLink
                active={state.activeTab === "1"}
                href="#"
                onClick={() => handleSetActiveTab("1")}
              >
                My Roles
              </NavLink>
            </NavItem>
            {/* ... (other NavItems) */}
          </Nav>
          <TabContent activeTab={state.activeTab}>
            <TabPane tabId="1">
              <Box m={5} p={10}>
                <Flex style={{ justifyContent: "center" }}>
                  {state.roles.map((role: Role, index: number) => (
                    <Box key={index} Flex>
                      <Icon
                        size="30"
                        name={role.isAssign ? "Beenhere" : "Cancel"}
                      />
                      <Button
                        p={3}
                        m={1}
                        onClick={() => handleAddMeTo(role.role)}
                      >
                        Assign {role.role}
                      </Button>
                      <Button
                        p={3}
                        m={1}
                        onClick={() => handleRemoveMeFrom(role.role)}
                      >
                        Remove {role.role}
                      </Button>
                    </Box>
                  ))}
                </Flex>
                {/* ... (rest of the UI components) */}
              </Box>
            </TabPane>
            {/* ... (other TabPanes) */}
          </TabContent>

          <Box>
            <Card color="green" bg="black" height={"auto"}>
              <Heading>LOGS:</Heading>
              {state.logs.map((log, index) => (
                <Text.p key={index} color="green">
                  {log}
                </Text.p>
              ))}
              <Heading color="red">ERROR:</Heading>
              <Text color="red">{state.errMessage}</Text>
            </Card>
          </Box>
        </div>
      </main>
    </>
  );
}
