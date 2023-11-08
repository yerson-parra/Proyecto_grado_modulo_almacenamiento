import { useState } from 'react'
import { Dialog, Popover } from '@headlessui/react'
import {
  Bars3Icon,
  XMarkIcon,
} from '@heroicons/react/24/outline'

import icono from "../assets/icono2.svg"
import { useAuth } from '../context/AuthContext'


export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const {isAuthenticated, logout, user} = useAuth()
  return (
    <header className="bg-white">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <a href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Logo</span>
            <img className="h-8 w-auto" src={icono} alt="" />
          </a>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        
        
          {
            isAuthenticated ? (
                <>
                <Popover.Group className="hidden lg:flex lg:gap-x-12">
                    <a href="/estaciones" className="text-sm font-semibold leading-6 text-gray-900">
                        Estaciones
                    </a>
                    <a href="/add-estaciones" className="text-sm font-semibold leading-6 text-gray-900">
                        Crear Estaciones
                    </a>
                    {
                      user.roles[0]==='admin'?(
                        <a href="/crearAdmin" className="text-sm font-semibold leading-6 text-gray-900">
                          Crear Admin
                        </a>
                      ):(<></>)

                    }

                </Popover.Group>
                <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                    <a href="/" className="text-sm font-semibold leading-6 text-blue-700" onClick={() =>{logout()}}>
                        Cerrar Sesion<span aria-hidden="true">&rarr;</span>
                    </a>
                </div>
                </>
            ) : (
                <>
                
                <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                    <a href="/login" className="text-sm font-semibold leading-6 text-blue-700">
                        Log in <span aria-hidden="true">&rarr;</span>
                    </a>
                </div>
                </>
            )
          }
       
        
      </nav>
      <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
        <div className="fixed inset-0 z-10" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <a href="/" className="-m-1.5 p-1.5">
              <span className="sr-only">Logo</span>
              <img
                className="h-8 w-auto"
                src={icono}
                alt=""
              />
            </a>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
            {
                isAuthenticated ? (
                    <>
                        <div className="space-y-2 py-6">
                            <a
                            href="/estaciones"
                            className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                            >
                            Estaciones
                            </a>
                            <a
                            href="/add-estaciones"
                            className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                            >
                            Crear Estaciones
                            </a>
                            {
                              user.roles[0]==='admin'?(
                                <a
                                href="/crearAdmin"
                                className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                >
                                Crear Admin
                                </a>
                              ):(<></>)

                            }
                           
                        </div>
                        <div className="py-6">
                            <a
                            href="/"
                            className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-blue-700 hover:bg-gray-50"
                            onClick={() =>{logout()}}
                            >
                            Cerrar Sesion
                            </a>
                        </div>
                    </>
                ) : (
                    <>
                       
                        <div className="py-6">
                            <a
                            href="/login"
                            className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-blue-700 hover:bg-gray-50"
                            >
                            Log in
                            </a>
                        </div>
                    </>
                )
            }
              
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  )
}