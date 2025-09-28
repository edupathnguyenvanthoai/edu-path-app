import { useState, useDeferredValue } from 'react';

import List from '@mui/material/List';
import { Stack } from '@mui/material';
import ListItem from '@mui/material/ListItem';
import TextField from '@mui/material/TextField';

import { allIconNames } from 'src/components/iconify/register-icons';

import { Iconify } from '../components/iconify';

export default function IconPages() {
  const [search, setSearch] = useState('');
  const filter = useDeferredValue(search);

  return (
    <Stack>
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
