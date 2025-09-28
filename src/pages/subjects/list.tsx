import { Fade, Stack } from '@mui/material';

import SubjectHeader from './header';
import CardViewSubject from './card-view';
import SearchSubject from './search-subjects';
import { Empty } from '../../components/empty/empty';
import { DialogHandleSubject } from './dialog-handle';
import { useSubjectController } from './use-subject-controller';

export default function SubjectList() {
  const { listData } = useSubjectController();

  return (
    <Fade in>
      <Stack spacing={1}>
        <SubjectHeader />
        <SearchSubject />
        {listData.length === 0 ? (
          <Empty />
        ) : (
          listData.map((x) => (
            <CardViewSubject key={x.item.id} subject={x.item} matches={x.matches} />
          ))
        )}
        <DialogHandleSubject />
      </Stack>
    </Fade>
  );
}
