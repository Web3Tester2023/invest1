/* This example requires Tailwind CSS v2.0+ */
import { Fragment } from 'react'
import { Popover, Transition } from '@headlessui/react'
import {
  HiBookmarkAlt,
  HiCalendar,
  HiChartBar,
  HiCursorClick,
  HiMenu,
  HiPhone,
  HiPlay,
  HiRefresh,
  HiShieldCheck,
  HiSupport,
  HiViewGrid,
  HiXCircle,
  HiChevronDown,
  HiChartPie
} from 'react-icons/hi'
import { GiStumpRegrowth } from "react-icons/gi"
import { RiDashboardFill } from "react-icons/ri"
import Account from '../Account'
// import { ChevronDownIcon } from '@heroicons/react/solid'

const solutions = [
  {
    name: 'Analytics',
    description: 'Get a better understanding of where your traffic is coming from.',
    href: '#',
    icon: HiChartBar,
  },
  {
    name: 'Engagement',
    description: 'Speak directly to your customers in a more meaningful way.',
    href: '#',
    icon: HiCursorClick,
  },
  { name: 'Security', description: "Your customers' data will be safe and secure.", href: '#', icon: HiShieldCheck },
  {
    name: 'Integrations',
    description: "Connect with third-party tools that you're already using.",
    href: '#',
    icon: HiViewGrid,
  },
  {
    name: 'Automations',
    description: 'Build strategic funnels that will drive your customers to convert',
    href: '#',
    icon: HiRefresh,
  },
]
const callsToAction = [
  { name: 'Watch Demo', href: '#', icon: HiPlay },
  { name: 'Contact Sales', href: '#', icon: HiPhone },
]
const resources = [
  {
    name: 'Help Center',
    description: 'Get all of your questions answered in our forums or contact support.',
    href: '#',
    icon: HiSupport,
  },
  {
    name: 'Guides',
    description: 'Learn how to maximize our platform to get the most out of it.',
    href: '#',
    icon: HiBookmarkAlt,
  },
  {
    name: 'Events',
    description: 'See what meet-ups and other events we might be planning near you.',
    href: '#',
    icon: HiCalendar,
  },
  { name: 'Security', description: 'Understand how we take your privacy seriously.', href: '#', icon: HiShieldCheck },
]
const recentPosts = [
  { id: 1, name: 'Boost your conversion rate', href: '#' },
  { id: 2, name: 'How to use search engine optimization to drive traffic to your site', href: '#' },
  { id: 3, name: 'Improve your customer experience', href: '#' },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function AppHeader() {
  return (
    <Popover className="relative bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center border-b-2 border-gray-100 py-6 md:justify-start md:space-x-10">
          <div className="flex justify-start lg:w-0 lg:flex-1">
            <a href="#" className='inline-flex items-center'>
              <span className="sr-only">Workflow</span>
              <img
                className="h-8 w-auto sm:h-10 mr-2"
                src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                alt=""
              />
              <span className='text-xl text-gray-800 font-semibold'>Coinvest</span>
            </a>
          </div>
          <div className="-mr-2 -my-2 md:hidden">
            <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
              <span className="sr-only">Open menu</span>
              <HiMenu className="h-6 w-6" aria-hidden="true" />
            </Popover.Button>
          </div>
          <Popover.Group as="nav" className="hidden md:flex space-x-8">
            
            <a href="/app" className="text-base inline-flex space-x-1 items-center  font-medium text-gray-500 hover:text-gray-900">
              <RiDashboardFill/> <span>Dashboard</span>
            </a>
            <a href="/app/investments" className="text-base inline-flex space-x-1 items-center font-medium text-gray-500 hover:text-gray-900">
              <HiChartPie/> <span>Investment</span>
            </a>
            <a href="#" className="text-base inline-flex space-x-1 items-center font-medium text-gray-500 hover:text-gray-900">
              <GiStumpRegrowth/> <span>Staking</span>
            </a>
            
          </Popover.Group>
          <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
          <Account/>
          </div>
        </div>
      </div>

      <Transition
        as={Fragment}
        enter="duration-200 ease-out"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="duration-100 ease-in"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <Popover.Panel focus className="absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden">
          <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y-2 divide-gray-50">
            <div className="pt-5 pb-6 px-5">
              <div className="flex items-center justify-between">
                <div>
                  <img
                    className="h-8 w-auto"
                    src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                    alt="Workflow"
                  />
                </div>
                <div className="-mr-2">
                  <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                    <span className="sr-only">Close menu</span>
                    <HiXCircle className="h-6 w-6" aria-hidden="true" />
                  </Popover.Button>
                </div>
              </div>
              <div className="mt-6">
                <nav className="grid gap-y-8">
                  {solutions.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="-m-3 p-3 flex items-center rounded-md hover:bg-gray-50"
                    >
                      <item.icon className="flex-shrink-0 h-6 w-6 text-indigo-600" aria-hidden="true" />
                      <span className="ml-3 text-base font-medium text-gray-900">{item.name}</span>
                    </a>
                  ))}
                </nav>
              </div>
            </div>
            <div className="py-6 px-5 space-y-6">
              <Account/>
            </div>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  )
}
