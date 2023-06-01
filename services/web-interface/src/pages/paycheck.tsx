import { List, ListItem } from "@mui/material";
import Link from "next/link";

export default function Paycheck() {
  return (
    <div>
      <h1>Paycheck</h1>
      <List>
        <ListItem>
          <Link href="/sample">Link Sample</Link>
        </ListItem>
        <ListItem>
          <Link href="/invoice">Link Invoice</Link>
        </ListItem>
        <ListItem>
          <Link href="/paycheck">Link Paycheck</Link>
        </ListItem>
        <ListItem>
          <Link href="/">Link Home</Link>
        </ListItem>
      </List>
    </div>
  );
}
