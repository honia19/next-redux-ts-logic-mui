'use client';

import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';

import Gallery from '../Gallery';
import ImageDetail from '../ImageDetail';

import useContainer from './hook';

const MainContentComponent = () => {
  const { selectedImage, handleTabChange, tab } = useContainer();

  return (
    <>
      <TabContext value={tab}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleTabChange} aria-label="lab API tabs example">
            <Tab label="Recently Added" value="1" />
            <Tab label="Favorited" value="2" />
          </TabList>
        </Box>
        <TabPanel value="1">
          <Gallery tab={tab} />
        </TabPanel>
        <TabPanel value="2">
          <Gallery tab={tab} />
        </TabPanel>
      </TabContext>
      {selectedImage && (
        <ImageDetail
          src={selectedImage.url}
          fileName={selectedImage.filename}
          size={selectedImage.sizeInBytes}
          selectedImage={selectedImage}
        />
      )}
    </>
  );
};

export default MainContentComponent;
