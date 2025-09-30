import { memo, useMemo } from 'react';

import {
  Tab,
  Chip,
  Stack,
  Collapse,
  IconButton,
  OutlinedInput,
  InputAdornment,
} from '@mui/material';

import { CATEGORY } from '../../../schema/constant';
import { Iconify } from '../../../components/iconify';
import useSearchParams from '../../../utils/use-params';
import ButtonTabsGroup from '../../../components/button-tabs-group';

export default memo(SearchSubject);

function SearchSubject() {
  const [search, setSearch] = useSearchParams('search');
  const [tab, setTab] = useSearchParams('category', 'Tất cả');
  const { isTab, isSearch } = useMemo(
    () => ({
      isTab: tab !== 'Tất cả',
      isSearch: Boolean(search),
    }),
    [search, tab]
  );

  return (
    <Stack sx={{ scrollSnapAlign: 'start' }}>
      <OutlinedInput
        sx={{ borderRadius: 1.5 }}
        startAdornment={
          <InputAdornment position="start">
            <Iconify width={24} icon="eva:search-fill" />
          </InputAdornment>
        }
        endAdornment={
          search && (
            <InputAdornment position="end">
              <IconButton onClick={() => setSearch('')}>
                <Iconify width={20} icon="mingcute:close-line" />
              </IconButton>
            </InputAdornment>
          )
        }
        placeholder="Tìm kiếm"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <ButtonTabsGroup
        value={tab || 'Tất cả'}
        onChange={(_, t) => setTab(t)}
        variant="scrollable"
        sx={{ width: 1, mt: 1 }}
      >
        {CATEGORY.map((x) => (
          <Tab key={x} value={x} label={x} />
        ))}
      </ButtonTabsGroup>
      <Collapse
        in={isSearch || isTab}
        timeout={{
          enter: 400,
          exit: 100,
          appear: 100,
        }}
      >
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
          {isTab && <Chip size="small" label={`Danh mục: ${tab}`} onDelete={() => setTab('')} />}
          {isSearch && (
            <Chip size="small" label={`Từ khoá: ${search}`} onDelete={() => setSearch('')} />
          )}
          {isTab && isSearch && (
            <Chip
              size="small"
              label="Bỏ tìm kiếm"
              onDelete={() => {
                setTab('');
                setSearch('');
              }}
            />
          )}
        </Stack>
      </Collapse>
    </Stack>
  );
}
