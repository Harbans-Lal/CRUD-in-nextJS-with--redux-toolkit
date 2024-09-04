import { Button, DrawerProps } from "@fluentui/react-components";
import * as React from "react";
import { ImageSearchRegular,TrayItemAddRegular,StoreMicrosoft20Regular,AddFilled } from "@fluentui/react-icons";
import {
  AppItem,
  Hamburger,
  NavDrawer,
  NavDrawerBody,
  NavDrawerFooter,
  NavDrawerHeader,
  NavDrawerProps,
  NavItem,

} from "@fluentui/react-nav-preview";

import {
  Label,
  Radio,
  RadioGroup,
  Switch,
  Tooltip,
  makeStyles,
  tokens,
  useId,
} from "@fluentui/react-components";
import {
  Board20Filled,
  Board20Regular,
  bundleIcon,
  PersonCircle32Regular,
} from "@fluentui/react-icons";
import Link from "next/link";
import { useRouter } from "next/navigation";

const useStyles = makeStyles({
  root: {
    overflow: "hidden",
    display: "flex",
    height: "600px",
  },
  content: {
    flex: "1",
    padding: "16px",
    display: "grid",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  field: {
    display: "flex",
    marginTop: "4px",
    marginLeft: "8px",
    flexDirection: "column",
    gridRowGap: tokens.spacingVerticalS,
  },
});

const Dashboard = bundleIcon(Board20Filled, Board20Regular);


type DrawerType = Required<DrawerProps>["type"];

export const NavDrawerDefault = (props: Partial<NavDrawerProps>) => {
 const [role, setRole] = React.useState("")
const router = useRouter();
  const styles = useStyles();
  const [isOpen, setIsOpen] = React.useState(true);
  const [type, setType] = React.useState<DrawerType>("inline");



  React.useEffect(()=>{
    let storeRole = JSON.parse(localStorage.getItem('role'));
    setRole(storeRole);
  })

  const renderHamburgerWithToolTip = () => {
    return (
      <Tooltip content="Navigation" relationship="label">
        <Hamburger onClick={() => setIsOpen(!isOpen)} />
      </Tooltip>
    );
  };
  const hadnleLogOut = () =>{
    localStorage.removeItem('dummyToken');
    localStorage.removeItem('role')
    router.push('/login')
  }
  return (
    <div className={styles.root}>
       <Tooltip content="" relationship="label">
        <Hamburger onClick={() => setIsOpen(!isOpen)} />
      </Tooltip>
      <NavDrawer
        defaultSelectedValue="2"
        defaultSelectedCategoryValue="1"
        open={isOpen}
        type={type}
      >
        <NavDrawerHeader>Logo</NavDrawerHeader>
        <NavDrawerBody>     
        <AppItem
            icon={<PersonCircle32Regular />}
            as="a"
            href="#"
          >
            Profile
          </AppItem>

          <Link  href={`/${role}/home`}>
            <NavItem icon={<ImageSearchRegular fontSize={20} />} value="1">
             Home
            </NavItem>
          </Link>
          

          <Link href={`/${role}/products`}>
            <NavItem  icon={<TrayItemAddRegular fontSize={20}  />} value="1">
                Products
            </NavItem>
          </Link>
         {role=='admin' && 
            <Link href= {`/${role}/users`} >
              <NavItem icon={<StoreMicrosoft20Regular />} value="1">
                 Users
              </NavItem>
            </Link>
         }
          
          <Link href={`/${role}/posts`}>
            <NavItem  icon={<Dashboard />} value="1">
            Posts
            </NavItem>
          </Link>
          
          <Link href={`/${role}/add-product`}>
            <NavItem  icon={<AddFilled />}value="1">
                Add product
            </NavItem>
          </Link>
         

        </NavDrawerBody>  

        <NavDrawerFooter className="mb-7">
          <Button   onClick={hadnleLogOut}>Log out</Button>
        </NavDrawerFooter>
      </NavDrawer>
    </div>
  );
};