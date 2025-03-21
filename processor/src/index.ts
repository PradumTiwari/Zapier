import { PrismaClient } from "@prisma/client";
import { Kafka } from "kafkajs";

const TOPIC_NAME="zap-events"
const client=new PrismaClient();

const kafka=new Kafka({
    clientId:"outbox-processor",
    brokers:["localhost:9092"]
})
async function main(){
   
     const producer=kafka.producer();
     await producer.connect();
    while(1){
        const pendingRows=await client.zapRunOutbox.findMany({
            where:{},
            take:10

        })

       
          producer.send({
            topic:TOPIC_NAME,
            messages:
               pendingRows.map(row=>({
                value:row.zapRunId
               }))
            
          })
          //Now we have sent it to kafka
            //Now we can delete the rows
            await client.zapRunOutbox.deleteMany({
                where:{
                    id:{
                        in:pendingRows.map(row=>row.id)
                    }

                }
            })
        
    }
}

main();