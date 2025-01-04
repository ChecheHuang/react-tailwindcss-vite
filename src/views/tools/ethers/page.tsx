import { ethers, JsonRpcSigner, BrowserProvider } from 'ethers'
import { useEffect, useState } from 'react'

declare global {
  interface Window {
    ethereum: any
  }
}

const Ethers = () => {
  const [provider, setProvider] = useState<BrowserProvider | undefined>(
    undefined,
  )
  const [signer, setSigner] = useState<JsonRpcSigner | undefined>(undefined)
  const [address, setAddress] = useState<string>('')

  const onLoad = async () => {
    if (!window.ethereum) return
    const provider = new ethers.BrowserProvider(window.ethereum)
    //   provider.send('eth_requestAccounts', [])
    const signer = await provider.getSigner()

    const address = await signer.getAddress()

    setProvider(provider)
    setSigner(signer)
    setAddress(address)
  }
  const listenEthereum = () => {
    console.log('window.ethereum', !!window.ethereum)
    if (!window.ethereum) {
      setTimeout(listenEthereum, 200)
      return
    }
    const proxyEth = new Proxy(window.ethereum, {
      get(target, prop, receiver) {
        const value = Reflect.get(target, prop, receiver)
        if (typeof value === 'function') {
          return (...args: Array<any>) => {
            console.log(
              `window.ethereum.${String(prop)} called with arguments:`,
              ...args,
            )
            const result = value.apply(target, args)
            result.then((res: any) => {
              console.log(`window.ethereum.${String(prop)} returned:`, res)
            })
            return result
          }
        }
        return value
      },
    })
    window.ethereum = proxyEth
  }
  useEffect(() => {
    onLoad()
    listenEthereum()
  }, [])

  return (
    <>
      <div className="p-4 bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500 rounded-lg shadow-lg">
        {provider && signer && (
          <div className="space-y-2">
            <div className="text-lg font-bold text-gray-800">
              Provider: {provider.constructor.name}
            </div>
            <div className="text-lg font-bold text-gray-800">
              Signer: {signer.constructor.name}
            </div>
            <div className="text-lg font-bold text-gray-800">
              Address: {address}
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default Ethers
