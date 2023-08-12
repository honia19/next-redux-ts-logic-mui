'use client';

import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import clsx from 'clsx';

import { Tab as EnumTab } from '@/types/tabs';

import Gallery from '../Gallery';
import ImageDetail from '../ImageDetail';

import useContainer from './hook';

const MainContentComponent = () => {
  const { selectedImage, handleTabChange, tab } = useContainer();

  return (
    <div className="gallery flex h-full min-h-screen w-full">
      <div
        className={clsx('bg-grey-snow px-5 pt-5', {
          'min-w-full': !selectedImage,
          'w-3/4': selectedImage,
        })}
      >
        <section className="flex w-full flex-col">
          <Typography variant="h5" fontWeight="bold">
            Photos
          </Typography>
          <TabContext value={tab}>
            <TabList onChange={handleTabChange}>
              <Tab wrapped label="Recently Added" value={EnumTab.RECENT} />
              <Tab wrapped label="Favorited" value={EnumTab.FAVORITE} />
            </TabList>
            <TabPanel value={EnumTab.RECENT}>
              <Gallery tab={tab} />
            </TabPanel>
            <TabPanel value={EnumTab.FAVORITE}>
              <Gallery tab={tab} />
            </TabPanel>
          </TabContext>
        </section>
      </div>
      {selectedImage && (
        <div className="flex w-1/4 flex-col">
          <ImageDetail
            src={selectedImage.url}
            fileName={selectedImage.filename}
            size={selectedImage.sizeInBytes}
            selectedImage={selectedImage}
          />
        </div>
      )}
    </div>
  );
};

export default MainContentComponent;
