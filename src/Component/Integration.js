import React,{useState,useEffect} from 'react'
import toast, { Toaster } from 'react-hot-toast';
import {Button} from 'react-bootstrap'
import contract from "./web3"
import Moment from 'react-moment';
Moment.globalFormat = 'D MMM YYYY';
const { ethereum } = window;
const Integration=()=>{
    const [walletKey,setwalletKey]=useState('')
    const [data,setData]=useState({address:'',url:'',tokenId:''})
    const [hash,setHash]=useState('')
    const [address,setAddress]=useState('')
    const [balance,setBalance]=useState('')
     const [Owner,setOwner]=useState('')
    const [time,setTime]=useState('')

    const connect=async()=>{
        if (typeof window.ethereum !== 'undefined') {
    //    const account=await ethereum.request({ method: 'eth_requestAccounts' });
        const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
         const account = accounts[0];
            console.log(account)
            setwalletKey(account)
          }else{

            alert("Please install MetaMask.");
          }
    }
    useEffect(()=>{connect()},[])
    const contractIntegration=async()=>{
        const data2=await contract.methods.owner().call()
        const data1=await contract.methods.name().call()
        console.log("=======>",data2,data1)
        const mintNft=await contract.methods.safeMint(data.address,data.url).send({from:walletKey})
        toast.success("Please wait transaction is in Process")
        console.log(mintNft)
        setHash(mintNft.transactionHash)
    }
    const setInput=(e)=>{ 
    setData({...data,[e.target.name]:e.target.value})
    }
    const stakeNft=async()=>{
        const stakeNFT=await contract.methods.stakeNFT(data.tokenId).send({from:walletKey})
        toast.success("Please wait transaction is in Process")
        console.log(stakeNFT)
        setHash(stakeNFT.transactionHash)

    }
    const unstakeNft=async()=>{
        const unstakeNFT=await contract.methods.unstakeNFT(data.tokenId).send({from:walletKey})
        toast.success("Please wait transaction is in Process")
        console.log(unstakeNFT)
        setHash(unstakeNFT.transactionHash)
    }
const balanceOF=async()=>{
    const balanceOf=await contract.methods.balanceOf(address).call()
    console.log(balanceOf)
    setBalance(balanceOf)
}
const stakedNft=async()=>{
    const stakedNFT=await contract.methods.stakedNFTs(data.tokenId).call()
    console.log(stakedNFT)
    setTime(stakedNFT.stakedTime)
    setOwner(stakedNFT.owner)
}
console.log(Owner,time)
    return(
        <div style={{display:"flex",zIndex: "9999",position: "absolute",top: "20px"}}>
                <div style={{height:"650px",width:"600px",position:"absolute",left:"337px",border:"2px solid red",borderRadius:"20px"}}>
                <h6>ConnectedAddress :<span style={{color:"red"}}>{walletKey}</span></h6>
           <input style={{borderColor:"red",height:"40px",width:"400px",marginRight:"5px",borderRadius:"15px"}} type="text" placeholder='Enter address'name="address" value={address}   onChange={(e)=>setAddress(e.target.value)}/><br/><br/>
           <Button variant="outline-primary" onClick={balanceOF}>balanceOF</Button><br/><br/>
            {balance&& <span style={{color:"red"}}>userBalance : {balance}</span>}<br/><br/>
            <input style={{borderColor:"red",height:"40px",width:"400px",marginRight:"5px",borderRadius:"15px"}} type="text" placeholder='Enter address'name="address" value={data.address}   onChange={(e)=>setInput(e)}/><br/><br/>
           <input style={{borderColor:"red",height:"40px",width:"400px",borderRadius:"15px"}} type="text" placeholder='Enter NFT url'name="url" value={data.url} onChange={(e)=>setInput(e)}/><br/><br/>
           <Button variant="outline-primary" onClick={contractIntegration}>mintNft</Button><br/><br/>
           <input style={{borderColor:"red",height:"40px",width:"400px",borderRadius:"15px"}} type="text" placeholder='Enter NFT tokenId'name="tokenId" value={data.tokenId} onChange={(e)=>setInput(e)}/><br/><br/>
            <Button  variant="outline-primary"  onClick={stakeNft}>stakeNFT</Button>
            <Button variant="outline-primary" style={{margin:"5px"}} onClick={unstakeNft}>unstakeNFT</Button>
            <Button variant="outline-primary"  onClick={stakedNft}>stakedNft</Button><br/><br/>

            { hash&&  <span style={{color:"greenyellow"}}> <a href={`https://goerli.etherscan.io/tx/${hash}`}><span style={{color:"red"}}>Check on Goerli etherscan :</span><br></br>{`https://goerli.etherscan.io/tx/${hash}`}</a></span> }
               {time&& <h5 style={{color:"black"}}>NFT staked Time:<span style={{color:"red"}}><Moment unix>{time}</Moment></span><br/><span>Owner Address : <span style={{color:"red"}}>{Owner}</span></span></h5> }
                </div>
           
            
            <Toaster toastOptions={{
    success: {
      style: {
        background: 'green',
        color:"white"
      },
    },
    error: {
      style: {
        background: 'white',
        color:'red'
      },
    },
  }} /></div>
    )
}
export default Integration