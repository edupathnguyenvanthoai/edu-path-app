import { create } from 'zustand';
import { useState, useDeferredValue } from 'react';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import TextField from '@mui/material/TextField';
import { Stack, Button, Typography } from '@mui/material';

import { allIconNames } from 'src/components/iconify/register-icons';

import { Iconify } from '../components/iconify';

type CountZustand = {
  count: number;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
};

const useCountZustand = create<CountZustand>((set) => {
  console.log('init zustand');

  return {
    count: 0,
    increment: () => {
      console.log('increment');
      set((state) => ({ count: state.count + 1 }));
    },
    decrement: () => {
      console.log('decrement');
      set((state) => ({ count: state.count - 1 }));
    },
    reset: () => set({ count: 0 }),
  };
});

function ButtonInCrementTest() {
  const { increment } = useCountZustand();
  return <Button onClick={increment}>InCremenet</Button>;
}

function ButtonDeCrementTest() {
  const { decrement } = useCountZustand();
  return <Button onClick={decrement}>DeCremenet</Button>;
}

function ViewTest() {
  const { count } = useCountZustand();
  return <Typography variant="h1">{count}</Typography>;
}

export default function IconPages() {
  const [search, setSearch] = useState('');
  const filter = useDeferredValue(search);
  const { count } = useCountZustand();
  console.log(count);

  return (
    <Stack>
      <Stack direction="row" justifyContent="center" gap={2}>
        <ButtonInCrementTest />
        <ViewTest />
        <ButtonDeCrementTest />
      </Stack>
      <TextField
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        label="Search"
        fullWidth
      />
      <List>
        {allIconNames
          .filter((n) => n.includes(filter))
          .map((name) => (
            <ListItem key={name}>
              <Iconify icon={name} sx={{ mr: 1 }} />
              {name}
            </ListItem>
          ))}
      </List>
    </Stack>
  );
}
