'use client';

import { Separator } from '@/components/ui/separator';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { useAuth } from '@/contexts/AuthContext';
import {
  ChevronDown,
  Globe,
  LogOut,
  Menu,
  Package,
  Settings,
  User,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

// Mock user data - replace with actual auth logic
const mockUserData = {
  name: 'Sarah Johnson',
  email: 'sarah.johnson@example.com',
  avatar: '/placeholder.svg?height=40&width=40',
  points: 350,
  tier: 'Silver',
};

export function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const { user } = useAuth();

  useEffect(() => {
    const checkAuthStatus = () => {
      const hasToken = localStorage.getItem('LOGGED');
      setIsLoggedIn(!!hasToken);
    };

    checkAuthStatus();
  }, [isLoggedIn]);

  const handleLogout = () => {
    localStorage.removeItem('AUTH_TOKEN');
    localStorage.removeItem('TOKEN_EXP');
    localStorage.removeItem('REFRESH_TOKEN');
    localStorage.removeItem('USERNAME');
    localStorage.removeItem('LOGGED');
    setIsLoggedIn(false);
  };

  const isActive = (path) => {
    return pathname === path;
  };

  return (
    <header className='sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
      <div className='container mx-auto flex h-16 items-center justify-between'>
        <div className='flex items-center gap-2'>
          <Link href='/' className='flex items-center gap-2'>
            <Image
              src={'/logo1.jpg'}
              alt='UBsim Logo'
              width={150}
              height={150}
            />
          </Link>
        </div>

        <nav className='hidden md:flex gap-6'>
          <Link
            href='/countries'
            className={`text-sm font-medium transition-colors hover:text-primary ${
              isActive('/countries') ? 'text-primary' : 'text-muted-foreground'
            }`}
          >
            Багцууд
          </Link>
          {/* <Link
            href='/plans'
            className={`text-sm font-medium transition-colors hover:text-primary ${
              isActive('/plans') ? 'text-primary' : 'text-muted-foreground'
            }`}
          >
            Plans
          </Link> */}
          <Link
            href='/about'
            className={`text-sm font-medium transition-colors hover:text-primary ${
              isActive('/about') ? 'text-primary' : 'text-muted-foreground'
            }`}
          >
            Бидний тухай
          </Link>
          <Link
            href='/faq'
            className={`text-sm font-medium transition-colors hover:text-primary ${
              isActive('/faq') ? 'text-primary' : 'text-muted-foreground'
            }`}
          >
            FAQ
          </Link>
        </nav>

        {/* User Actions */}
        <div className='flex items-center gap-4'>
          {isLoggedIn ? (
            <>
              {/* <Button variant='ghost' size='icon' className='hidden sm:flex'>
                <Bell className='h-5 w-5' />
                <span className='sr-only'>Notifications</span>
              </Button> */}

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant='ghost'
                    className='flex items-center gap-2 p-1 px-2'
                  >
                    <Avatar className='h-8 w-8'>
                      <AvatarImage src={user?.avatar} alt={user?.name} />
                      <AvatarFallback>
                        {user?.name
                          .split(' ')
                          .map((n) => n[0])
                          .join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className='hidden md:block text-left'>
                      <p className='text-sm font-medium'>{user?.name}</p>
                      <p className='text-xs text-muted-foreground'>
                        {user?.tier} Member
                      </p>
                    </div>
                    <ChevronDown className='h-4 w-4 text-muted-foreground' />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align='end' className='w-56'>
                  <DropdownMenuLabel>
                    <div className='flex flex-col space-y-1'>
                      <p className='text-sm font-medium leading-none'>
                        {user?.name}
                      </p>
                      <p className='text-xs leading-none text-muted-foreground'>
                        {user?.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem asChild>
                      <Link href='/dashboard' className='cursor-pointer'>
                        <User className='mr-2 h-4 w-4' />
                        <span>Хяналтын самбар</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href='/dashboard/orders' className='cursor-pointer'>
                        <Package className='mr-2 h-4 w-4' />
                        <span>Миний захиалгууд</span>
                        <Badge className='ml-auto' variant='outline'>
                          {3}
                        </Badge>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href='/dashboard/points' className='cursor-pointer'>
                        <span className='mr-2 flex h-4 w-4 items-center justify-center font-semibold text-xs'>
                          P
                        </span>
                        <span>Миний оноо</span>
                        <Badge className='ml-auto' variant='outline'>
                          {user?.points}
                        </Badge>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link
                        href='/dashboard/settings'
                        className='cursor-pointer'
                      >
                        <Settings className='mr-2 h-4 w-4' />
                        <span>Тохиргоо</span>
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={handleLogout}
                    className='cursor-pointer text-destructive focus:text-destructive'
                  >
                    <LogOut className='mr-2 h-4 w-4' />
                    <span>Гарах</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              <Link
                href='/login'
                className='text-sm font-medium hover:underline underline-offset-4 hidden sm:block'
              >
                Нэвтрэх
              </Link>
              <Button asChild size='sm'>
                <Link href='/register'>Бүртгүүлэх</Link>
              </Button>
            </>
          )}

          {/* Mobile Menu */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant='outline' size='icon' className='md:hidden'>
                <Menu className='h-5 w-5' />
                <span className='sr-only'>Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side='right' className='w-[300px] sm:w-[400px]'>
              <SheetHeader className='pb-6'>
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>
              <div className='flex flex-col gap-4'>
                <div className='flex flex-col space-y-3'>
                  <Link
                    href='/destinations'
                    className='flex items-center py-2 text-base font-medium'
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Globe className='mr-2 h-5 w-5' />
                    Destinations
                  </Link>
                  <Link
                    href='/plans'
                    className='flex items-center py-2 text-base font-medium'
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Package className='mr-2 h-5 w-5' />
                    Plans
                  </Link>
                  <Link
                    href='/how-it-works'
                    className='flex items-center py-2 text-base font-medium'
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Settings className='mr-2 h-5 w-5' />
                    How It Works
                  </Link>
                  <Link
                    href='/faq'
                    className='flex items-center py-2 text-base font-medium'
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span className='mr-2 flex h-5 w-5 items-center justify-center font-semibold'>
                      ?
                    </span>
                    FAQ
                  </Link>
                </div>

                <Separator />

                {isLoggedIn ? (
                  <div className='flex flex-col space-y-3'>
                    <div className='flex items-center gap-3 py-2'>
                      <Avatar className='h-10 w-10'>
                        <AvatarImage
                          src={mockUserData.avatar}
                          alt={mockUserData.name}
                        />
                        <AvatarFallback>
                          {mockUserData.name
                            .split(' ')
                            .map((n) => n[0])
                            .join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className='text-sm font-medium'>
                          {mockUserData.name}
                        </p>
                        <p className='text-xs text-muted-foreground'>
                          {mockUserData.tier} Member
                        </p>
                      </div>
                    </div>

                    <Link
                      href='/dashboard'
                      className='flex items-center py-2 text-base font-medium'
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <User className='mr-2 h-5 w-5' />
                      Dashboard
                    </Link>
                    <Link
                      href='/dashboard/orders'
                      className='flex items-center justify-between py-2 text-base font-medium'
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <div className='flex items-center'>
                        <Package className='mr-2 h-5 w-5' />
                        My Orders
                      </div>
                      <Badge variant='outline'>{3}</Badge>
                    </Link>
                    <Link
                      href='/dashboard/points'
                      className='flex items-center justify-between py-2 text-base font-medium'
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <div className='flex items-center'>
                        <span className='mr-2 flex h-5 w-5 items-center justify-center font-semibold text-sm'>
                          P
                        </span>
                        My Points
                      </div>
                      <Badge variant='outline'>{mockUserData.points}</Badge>
                    </Link>
                    <Link
                      href='/dashboard/settings'
                      className='flex items-center py-2 text-base font-medium'
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <Settings className='mr-2 h-5 w-5' />
                      Settings
                    </Link>

                    <Separator />

                    <Button
                      variant='destructive'
                      className='w-full'
                      onClick={() => {
                        handleLogout();
                        setMobileMenuOpen(false);
                      }}
                    >
                      <LogOut className='mr-2 h-4 w-4' />
                      Log out
                    </Button>
                  </div>
                ) : (
                  <div className='flex flex-col space-y-3'>
                    <Button asChild variant='outline' className='w-full'>
                      <Link
                        href='/login'
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Нэвтрэх
                      </Link>
                    </Button>
                    <Button asChild className='w-full'>
                      <Link
                        href='/register'
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Бүртгүүлэх
                      </Link>
                    </Button>
                  </div>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
