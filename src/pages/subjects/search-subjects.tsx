import { useSearchParams } from 'react-router-dom';
import { memo, useState, useEffect, useDeferredValue } from 'react';

import { Tab, Chip, Stack, Collapse, TextField, IconButton, InputAdornment } from '@mui/material';

import { CATEGORY } from '../../schema/constant';
import { Iconify } from '../../components/iconify';
import ButtonTabsGroup from '../../components/button-tabs-group';

export default memo(SearchSubject);

function SearchSubject() {
  const [search, setSearch] = useSearchParams();
  const tab = search.get('category') || '';
  const [searchText, setSearchText] = useState(search.get('search') || '');
  const _search = useDeferredValue(searchText);

  const admissionGroups = (search.get('admissionGroups') || '').split(',').filter(Boolean);
  const searchLength = admissionGroups.length + (tab ? 1 : 0) + (_search ? 1 : 0);

  useEffect(() => {
    setSearch(
      (s) => {
        if (_search) s.set('search', _search);
        else s.delete('search');
        return s;
      },
      { replace: true }
    );
  }, [_search, setSearch]);

  return (
    <Stack>
      <TextField
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <Iconify width={24} icon="eva:search-fill" />
              </InputAdornment>
            ),
            endAdornment: searchText && (
              <InputAdornment position="end">
                <IconButton onClick={() => setSearchText('')}>
                  <Iconify width={20} icon="mingcute:close-line" />
                </IconButton>
              </InputAdornment>
            ),
          },
        }}
        placeholder="Tìm kiếm"
        size="medium"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
      <ButtonTabsGroup
        value={tab || 'Tất cả'}
        onChange={(_, t) => {
          if (t === 'Tất cả') search.delete('category');
          else search.set('category', t);
          setSearch(search, { replace: true });
        }}
        variant="scrollable"
        sx={{ width: 1, mt: 1 }}
      >
        {Object.keys(CATEGORY).map((x) => (
          <Tab key={x} value={x} label={x} />
        ))}
      </ButtonTabsGroup>
      <Collapse in={searchLength > 0}>
        <Stack
          direction="row"
          flexWrap="wrap"
          sx={{
            gap: 0.5,
            border: 1,
            borderColor: 'divider',
            borderStyle: 'dashed',
            p: 1,
            borderRadius: 1.5,
            mt: 1,
          }}
        >
          {admissionGroups.length > 0 &&
            admissionGroups.map((x) => (
              <Chip
                size="small"
                key={x}
                label={x}
                onDelete={() => {
                  const ad = admissionGroups.filter((y) => y !== x);
                  if (ad.length) search.set('admissionGroups', ad.join(','));
                  else search.delete('admissionGroups');
                  setSearch(search, { replace: true });
                }}
              />
            ))}
          {tab && (
            <Chip
              size="small"
              label={`Danh mục: ${tab}`}
              onDelete={() => {
                search.delete('category');
                setSearch(search, { replace: true });
              }}
            />
          )}
          {searchText && (
            <Chip
              size="small"
              label={`Từ khoá: ${searchText}`}
              onDelete={() => {
                setSearchText('');
              }}
            />
          )}
          {searchLength > 1 && (
            <Chip
              size="small"
              label="Bỏ tìm kiểm"
              onDelete={() => {
                setSearch({});
                setSearchText('');
              }}
            />
          )}
        </Stack>
      </Collapse>
    </Stack>
  );
}
