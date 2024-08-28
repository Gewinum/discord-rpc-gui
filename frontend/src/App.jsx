import { useState, useEffect } from 'react'
import {Events, WML} from "@wailsio/runtime";
import {DiscordRPCService} from "../bindings/github.com/Gewinum/discord-rpc-gui";

function App() {
    const [appId, setAppId] = useState('');
    const [discordState, setDiscordState] = useState('');
    const [discordDetails, setDiscordDetails] = useState('');
    const [bigImage, setBigImage] = useState('')
    const [bigImageDetails, setBigImageDetails] = useState('')
    const [smallImage, setSmallImage] = useState('')
    const [smallImageDetails, setSmallImageDetails] = useState('')
    const [result, setResult] = useState('Please, enter the data');
    const [processing, setProcessing] = useState(false)

    const submitDiscordRPC = () => {
        setProcessing(true)
        setResult("Loading...")
        DiscordRPCService.UpdatePresence(appId, discordState, discordDetails, bigImage, bigImageDetails, smallImage, smallImageDetails).then((resultValue) => {
            setProcessing(false)
            setResult(resultValue);
        }).catch((err) => {
            setProcessing(false);
            console.log(err);
        });
    }

    // loading data from config.yml
    useEffect(() => {
        DiscordRPCService.GetAppID().then((resultValue) => {
            setAppId(resultValue)
        })

        DiscordRPCService.GetDiscordState().then((resultValue) => {
            setDiscordState(resultValue)
        })

        DiscordRPCService.GetDiscordDetails().then((resultValue) => {
            setDiscordDetails(resultValue)
        })

        DiscordRPCService.GetBigImage().then((resultValue) => {
            setBigImage(resultValue)
        })

        DiscordRPCService.GetBigImageDetails().then(resultValue => {
            setBigImageDetails(resultValue)
        })

        DiscordRPCService.GetSmallImage().then((resultValue) => {
            setSmallImage(resultValue)
        })

        DiscordRPCService.GetSmallImageDetails().then(resultValue => {
            setSmallImageDetails(resultValue)
        })
    }, []);

    return (
        <div className="container">
            <h1 className="text-2xl mb-5">Discord RPC GUI</h1>
            <div className="result mb-2">{result}</div>
            <div className="text-white">
                <label className="block mb-1" htmlFor="forms-labelOverInputCode">App ID</label>
                <input
                    className="w-full h-12 px-4 mb-2 text-lg text-gray-700 placeholder-gray-600 border rounded-lg focus:shadow-outline"
                    type="text" value={appId} placeholder="App ID" onChange={(e) => setAppId(e.target.value)}
                    id="forms-labelOverInputCode"/>
            </div>
            <div className="text-white mt-2">
                <label className="block mb-1" htmlFor="forms-labelOverInputCode">State</label>
                <input
                    className="w-full h-12 px-4 mb-2 text-lg text-gray-700 placeholder-gray-600 border rounded-lg focus:shadow-outline"
                    type="text" value={discordState} placeholder="State"
                    onChange={(e) => setDiscordState(e.target.value)}
                    id="forms-labelOverInputCode"/>
            </div>
            <div className="text-white mt-2">
                <label className="block mb-1" htmlFor="forms-labelOverInputCode">Details</label>
                <input
                    className="w-full h-12 px-4 mb-2 text-lg text-gray-700 placeholder-gray-600 border rounded-lg focus:shadow-outline"
                    type="text" value={discordDetails} placeholder="Details"
                    onChange={(e) => setDiscordDetails(e.target.value)}
                    id="forms-labelOverInputCode"/>
            </div>
            <div className="text-white mt-2">
                <label className="block mb-1" htmlFor="forms-labelOverInputCode">Big image</label>
                <input
                    className="w-full h-12 px-4 mb-2 text-lg text-gray-700 placeholder-gray-600 border rounded-lg focus:shadow-outline"
                    type="text" value={bigImage} placeholder="Big image"
                    onChange={(e) => setBigImage(e.target.value)}
                    id="forms-labelOverInputCode"/>
            </div>
            <div className="text-white mt-2">
                <label className="block mb-1" htmlFor="forms-labelOverInputCode">Big image details</label>
                <input
                    className="w-full h-12 px-4 mb-2 text-lg text-gray-700 placeholder-gray-600 border rounded-lg focus:shadow-outline"
                    type="text" value={bigImageDetails} placeholder="Big image details"
                    onChange={(e) => setBigImageDetails(e.target.value)}
                    id="forms-labelOverInputCode"/>
            </div>
            <div className="text-white mt-2">
                <label className="block mb-1" htmlFor="forms-labelOverInputCode">Small image</label>
                <input
                    className="w-full h-12 px-4 mb-2 text-lg text-gray-700 placeholder-gray-600 border rounded-lg focus:shadow-outline"
                    type="text" value={smallImage} placeholder="Small image"
                    onChange={(e) => setSmallImage(e.target.value)}
                    id="forms-labelOverInputCode"/>
            </div>
            <div className="text-white mt-2">
                <label className="block mb-1" htmlFor="forms-labelOverInputCode">Small image details</label>
                <input
                    className="w-full h-12 px-4 mb-2 text-lg text-gray-700 placeholder-gray-600 border rounded-lg focus:shadow-outline"
                    type="text" value={smallImageDetails} placeholder="Small image details"
                    onChange={(e) => setSmallImageDetails(e.target.value)}
                    id="forms-labelOverInputCode"/>
            </div>

            <button
                className="h-12 px-6 m-2 text-lg text-indigo-100 transition-colors duration-150 bg-indigo-700 rounded-lg focus:shadow-outline hover:bg-indigo-800"
                onClick={submitDiscordRPC} disabled={processing}>Update
            </button>
        </div>
    )
}

export default App
