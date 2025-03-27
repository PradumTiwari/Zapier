"use client";

import { BACKEND_URL } from "../../../app/config";
import Appbar from "../../../component/AppBar";
import { ZapCell } from "../../../component/ZapCell";
import { PrimaryButton } from "../../../component/Button/PrimaryButton";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function useAvailableActionsAndTriggers() {
    const [availableActions, setAvailableActions] = useState([]);
    const [availableTriggers, setAvailableTriggers] = useState([]);

    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/trigger/available`)
            .then(x => {
                console.log("Fetched Triggers:", x.data.availableTriggers);
                setAvailableTriggers(x.data.availableTriggers);
            })
            .catch(err => console.error("Error fetching triggers:", err));

            axios.get(`${BACKEND_URL}/api/v1/action/available`)
            .then(response => {
                console.log("Full Response:", response);
                console.log("Fetched Actions:", response.data?.availableActions);
                setAvailableActions(response.data?.availableActions || []);
            })
            .catch(err => console.error("Error fetching actions:", err)); 
        
        }
            , []);

    return {
        availableActions,
        availableTriggers
    };
}

export default function ZapPage() {
    const router = useRouter();
    const { availableActions, availableTriggers } = useAvailableActionsAndTriggers();

    const [selectedTrigger, setSelectedTrigger] = useState<{ id: string; name: string } | null>(null);
    const [selectedActions, setSelectedActions] = useState<{ index: number; availableActionId: string; availableActionName: string }[]>([]);
    const [selectedModalIndex, setSelectedModalIndex] = useState<number | null>(null);

    const handlePublish = async () => {
        if (!selectedTrigger?.id) return;

        try {
            await axios.post(
                `${BACKEND_URL}/api/v1/zap`,
                {
                    availableTriggerId: selectedTrigger.id,
                    triggerMetadata: {},
                    actions: selectedActions.map((a) => ({
                        availableActionId: a.availableActionId,
                        actionMetadata: {},
                    })),
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
                    },
                }
            );
            router.push("/dashboard");
        } catch (error) {
            console.error("Error publishing zap:", error);
        }
    };

    return (
        <div>
        
            <div className="flex justify-end bg-slate-200 p-4">
                <PrimaryButton onClick={handlePublish}>Publish</PrimaryButton>
            </div>

            {/* Main Layout */}
            <div className="w-full min-h-screen bg-slate-200 flex flex-col justify-center">
                {/* Trigger */}
                <div className="flex justify-center w-full">
                    <ZapCell
                        onClick={() => setSelectedModalIndex(1)}
                        name={selectedTrigger?.name || "Trigger"}
                        index={1}
                    />
                </div>

                {/* Actions List */}
                <div className="w-full pt-2 pb-2">
                    {selectedActions.length > 0 &&
                        selectedActions.map((action) => (
                            <div key={action.index} className="pt-2 flex justify-center">
                                <ZapCell
                                    onClick={() => setSelectedModalIndex(action.index)}
                                    name={action.availableActionName || "Action"}
                                    index={action.index}
                                />
                            </div>
                        ))}
                </div>

                {/* Add Action Button */}
                <div className="flex justify-center">
                    <PrimaryButton
                        onClick={() =>
                            setSelectedActions((prev) => [
                                ...prev,
                                {
                                    index: prev.length + 2,
                                    availableActionId: "",
                                    availableActionName: "Select an Action",
                                },
                            ])
                        }
                    >
                        <div className="text-2xl">+</div>
                    </PrimaryButton>
                </div>
            </div>

            {/* Modal Component */}
            {selectedModalIndex !== null && (
                <Modal
                    availableItems={selectedModalIndex === 1 ? availableTriggers : availableActions}
                    onSelect={(props) => {
                        if (!props) {
                            setSelectedModalIndex(null);
                            return;
                        }

                        if (selectedModalIndex === 1) {
                            setSelectedTrigger({ id: props.id, name: props.name });
                        } else {
                            setSelectedActions((prevActions) =>
                                prevActions.map((action) =>
                                    action.index === selectedModalIndex
                                        ? { ...action, availableActionId: props.id, availableActionName: props.name }
                                        : action
                                )
                            );
                        }

                        setSelectedModalIndex(null);
                    }}
                    index={selectedModalIndex}
                />
            )}
        </div>
    );
}

// Modal Component
function Modal({
    index,
    onSelect,
    availableItems = [],
}: {
    index: number;
    onSelect: (props: { name: string; id: string } | null) => void;
    availableItems?: { id: string; name: string; image: string }[];
}) {
    return (
        <div className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-[calc(100%-1rem)] max-h-full bg-slate-100 bg-opacity-70">
            <div className="relative p-4 w-full max-w-2xl max-h-full">
                <div className="relative bg-white rounded-lg shadow">
                    <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
                        <div className="text-xl">Select {index === 1 ? "Trigger" : "Action"}</div>
                        <button
                            onClick={() => onSelect(null)}
                            type="button"
                            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
                        >
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                />
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                    </div>

                    <div className="p-4 md:p-5 space-y-4">
                        {availableItems.length > 0 ? (
                            availableItems.map(({ id, name, image }) => (
                                <div
                                    key={id}
                                    onClick={() => onSelect({ id, name })}
                                    className="flex border p-4 cursor-pointer hover:bg-slate-100"
                                >
                                    <img src={image} width={30} className="rounded-full" alt={name} />
                                    <div className="flex flex-col justify-center ml-2">{name}</div>
                                </div>
                            ))
                        ) : (
                            <p className="text-center text-gray-500">No items available</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
