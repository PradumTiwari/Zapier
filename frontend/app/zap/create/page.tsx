
"use client";

import  Appbar  from "../../../component/AppBar";
import { ZapCell } from "../../../component/ZapCell";
import  LinkButton  from "../../../component/Button/LinkButton";
import { PrimaryButton } from "../../../component/Button/PrimaryButton";
import { useState } from "react";
import BasicModal from "@/component/modal";

export default function() {
    
    const [selectedTrigger, setSelectedTrigger] = useState("");
    const [selectedActions, setSelectedActions] = useState<{
        index:number;
        availableActionId: string;
        availableActionName: string;
    }[]>([]);

    return <div>
       
        <div className="w-full min-h-screen bg-slate-200 flex flex-col justify-center">
            <div className="flex justify-center w-full">
              <button>  <ZapCell  name={selectedTrigger ? selectedTrigger : "Trigger"} index={1} /></button>
            </div>
            <div className="w-full pt-2 pb-2">
                {selectedActions.map((action, index) => <div key={index} className="pt-2 flex justify-center"> <ZapCell name={action.availableActionName ? action.availableActionName : "Action"} index={action.index} /> </div>)}
            </div>
            <div className="flex justify-center">
                <div>
                    <PrimaryButton onClick={() => {
                        setSelectedActions(a => [...a, {
                            index:a.length+2,
                            availableActionId: "",
                            availableActionName: ""
                        }])
                    }}><div className="text-2xl">
                        +
                    </div></PrimaryButton>
                    
                </div>
            </div>
        </div>
    </div>
}


