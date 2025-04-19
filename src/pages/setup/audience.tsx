import React, { useState } from 'react';
import {
  Tabs, TabList, TabPanels, Tab, TabPanel,
  Box, FormControl, FormLabel, Input, VStack, Text,
  SimpleGrid, Divider, Button, Flex, Select, Textarea,
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton,
  ModalBody, ModalFooter, useDisclosure, useColorModeValue,
  Checkbox, CheckboxGroup, Tag, TagLabel
} from '@chakra-ui/react';
import { CopyIcon } from '@chakra-ui/icons';
import Heading from '@/components/ui/Heading';
import SetupLayout from '../../components/layout/SetupLayout';

const SOCIAL_PLATFORMS = [
  { key: 'facebook', label: 'Facebook', url: 'https://facebook.com/youraccount', followersLabel: 'Likes', fakeValue: '12000' },
  { key: 'twitter', label: 'Twitter', url: 'https://twitter.com/youraccount', followersLabel: 'Followers', fakeValue: '8500' },
  { key: 'instagram', label: 'Instagram', url: 'https://instagram.com/youraccount', followersLabel: 'Followers', fakeValue: '15000' },
  { key: 'youtube', label: 'YouTube', url: 'https://youtube.com/youraccount', followersLabel: 'Subscribers', fakeValue: '4000' },
  { key: 'linkedin', label: 'LinkedIn', url: 'https://linkedin.com/company/youraccount', followersLabel: 'Followers', fakeValue: '2200' },
];

const NEWSLETTER_FREQUENCIES = ['Daily', 'Weekly', 'Bi-weekly', 'Monthly', 'Quarterly'];

// Default newsletters
const DEFAULT_NEWSLETTERS = [
  {
    id: 'news-1',
    name: 'Weekly Community Update',
    frequency: 'Weekly',
    description: 'A roundup of local news and community events',
    subscribers: '2,450',
    openRate: '32',
    clicks: '420',
    sampleUrl: 'https://example.com/weekly-update'
  },
  {
    id: 'news-2',
    name: 'Business Insider',
    frequency: 'Monthly',
    description: 'Local business news and economic updates',
    subscribers: '1,875',
    openRate: '28',
    clicks: '310',
    sampleUrl: 'https://example.com/business-insider'
  }
];

// Sample audience demographics
const audienceDemographics = {
  'Age Groups': [
    '18-24',
    '25-34',
    '35-44',
    '45-54',
    '55-64',
    '65+',
  ],
  'Income Levels': [
    'Under $25,000',
    '$25,000 - $49,999',
    '$50,000 - $74,999',
    '$75,000 - $99,999',
    '$100,000 - $149,999',
    '$150,000+',
  ],
  'Education': [
    'High School or Less',
    'Some College',
    'Associate Degree',
    'Bachelor\'s Degree',
    'Graduate Degree',
  ],
  'Geographic Focus': [
    'Hyperlocal',
    'City/Metro Area',
    'Regional',
    'State/Provincial',
    'National',
    'International',
  ],
};

const AudienceInfoSetup = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const tagBg = useColorModeValue('blue.50', 'blue.900');

  const [webData, setWebData] = useState({
    mobilePercent: '',
    desktopPercent: '',
    pageViews: '',
    visitors: '',
    pagesPerVisit: ''
  });

  const [socialData, setSocialData] = useState(
    SOCIAL_PLATFORMS.reduce((acc, p) => {
      acc[p.key] = { url: '', followers: '', linked: false };
      return acc;
    }, {} as Record<string, { url: string; followers: string; linked: boolean }>)
  );

  const [newsletters, setNewsletters] = useState<any[]>(DEFAULT_NEWSLETTERS);
  const [showNewsletterModal, setShowNewsletterModal] = useState(false);
  const [editingNewsletter, setEditingNewsletter] = useState<any>(null);
  const [developerEmail, setDeveloperEmail] = useState('');
  const [selectedDemographics, setSelectedDemographics] = useState<Record<string, string[]>>({});

  const handleWebDataChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setWebData(prev => ({ ...prev, [name]: value }));
  };

  const handleSocialUrlChange = (key: string, value: string) => {
    setSocialData(prev => ({
      ...prev,
      [key]: { ...prev[key], url: value }
    }));
  };

  const handleSocialFollowersChange = (key: string, value: string) => {
    setSocialData(prev => ({
      ...prev,
      [key]: { ...prev[key], followers: value }
    }));
  };

  const handleSocialLink = (key: string) => {
    setSocialData(prev => ({
      ...prev,
      [key]: { ...prev[key], linked: true, followers: SOCIAL_PLATFORMS.find(p => p.key === key)?.fakeValue || '' }
    }));
  };

  const handleAddNewsletter = () => {
    setEditingNewsletter({});
    setShowNewsletterModal(true);
  };

  const handleEditNewsletter = (id: string) => {
    const newsletter = newsletters.find(n => n.id === id);
    setEditingNewsletter(newsletter);
    setShowNewsletterModal(true);
  };

  const handleRemoveNewsletter = (id: string) => {
    setNewsletters(prev => prev.filter(n => n.id !== id));
  };

  const handleNewsletterFieldChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditingNewsletter((prev: any) => ({ ...prev, [name]: value }));
  };

  // Handle demographic selection
  const handleDemographicChange = (demographic: string, values: string[]) => {
    setSelectedDemographics(prev => ({
      ...prev,
      [demographic]: values
    }));
  };

  const handleSaveNewsletter = () => {
    if (!editingNewsletter.id) {
      editingNewsletter.id = Math.random().toString(36).substr(2, 9);
    }

    setNewsletters(prev => {
      const exists = prev.find(n => n.id === editingNewsletter.id);
      if (exists) {
        return prev.map(n => (n.id === editingNewsletter.id ? editingNewsletter : n));
      } else {
        return [...prev, editingNewsletter];
      }
    });

    setShowNewsletterModal(false);
  };

  return (
    <SetupLayout currentStep="audience">
      <VStack spacing={8} align="stretch">
        <Tabs variant="enclosed" colorScheme="blue" mb={8}>
          <TabList>
            <Tab>Web Analytics</Tab>
            <Tab>Demographics</Tab>
            <Tab>Social Media</Tab>
            <Tab>Newsletter</Tab>
          </TabList>

          <TabPanels>
            {/* Web Analytics */}
            <TabPanel>
              <Box>
                <Heading variant="h3" mb={2}>Web Analytics</Heading>
                <Text color="gray.600" mb={4}>Enter your website's audience breakdown and tracking information.</Text>
                
                <Box borderWidth="1px" borderRadius="md" p={4} mb={6} bg="blue.50">
                  <Heading as="h4" size="sm" mb={2} color="blue.700">Add code into header on your website</Heading>
                  <Text color="gray.600" mb={3} fontSize="sm">
                    Adding this code to your website's header is crucial for ad optimization, placement support, and general analytics. 
                    Copy and paste the code below right before the closing &lt;/head&gt; tag at the end of your header.
                  </Text>
                  <Textarea 
                    value={`<script async type="text/javascript" src="https://adbundle.empowerlocal.co/bundle.js?publicationKey=williamsonsource-com"></script>`}
                    readOnly
                    height="80px"
                    fontFamily="mono"
                    fontSize="sm"
                    mb={3}
                    bg="white"
                  />
                  <Flex gap={3}>
                    <Button 
                      bg="red.600" 
                      color="white" 
                      _hover={{ bg: "red.700" }} 
                      size="sm" 
                      leftIcon={<CopyIcon />} 
                      onClick={() => {
                        navigator.clipboard.writeText(`<script async type="text/javascript" src="https://adbundle.empowerlocal.co/bundle.js?publicationKey=williamsonsource-com"></script>`);
                      }}
                    >
                      Copy
                    </Button>
                    <Button colorScheme="blue" size="sm" variant="outline" onClick={onOpen}>
                      Send Code to Developer
                    </Button>
                  </Flex>
                </Box>
                
                <Heading variant="h3" size="sm" mb={3}>Traffic Statistics</Heading>
                <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6} mb={6}>
                  <FormControl>
                    <FormLabel>Monthly Page Views</FormLabel>
                    <Input 
                      type="number" 
                      name="pageViews" 
                      value={webData.pageViews} 
                      onChange={handleWebDataChange} 
                      placeholder="e.g. 50000" 
                      min={0} 
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Monthly Visitors</FormLabel>
                    <Input 
                      type="number" 
                      name="visitors" 
                      value={webData.visitors} 
                      onChange={handleWebDataChange} 
                      placeholder="e.g. 25000" 
                      min={0} 
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Pages Per Visit</FormLabel>
                    <Input 
                      type="number" 
                      name="pagesPerVisit" 
                      value={webData.pagesPerVisit} 
                      onChange={handleWebDataChange} 
                      placeholder="e.g. 2.5" 
                      min={0} 
                      step="0.1"
                    />
                  </FormControl>
                </SimpleGrid>
                
                <Heading variant="h3" size="sm" mb={3}>Device Breakdown</Heading>
                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6} mb={6}>
                  <FormControl>
                    <FormLabel>Mobile (%)</FormLabel>
                    <Input 
                      type="number" 
                      name="mobilePercent" 
                      value={webData.mobilePercent} 
                      onChange={handleWebDataChange} 
                      placeholder="e.g. 70" 
                      min={0} 
                      max={100} 
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Desktop (%)</FormLabel>
                    <Input 
                      type="number" 
                      name="desktopPercent" 
                      value={webData.desktopPercent} 
                      onChange={handleWebDataChange} 
                      placeholder="e.g. 30" 
                      min={0} 
                      max={100} 
                    />
                  </FormControl>
                </SimpleGrid>
              </Box>
            </TabPanel>

            {/* Demographics */}
            <TabPanel>
              <Box>
                <Heading variant="h3" mb={4}>Audience Demographics</Heading>
                <Text fontSize="sm" color="gray.500" mb={4}>
                  Select at least one option from each category that best describes your audience demographics.
                </Text>
                
                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6} mb={6}>
                  {Object.entries(audienceDemographics).map(([demographic, options]) => (
                    <Box key={demographic} p={4} borderWidth="1px" borderRadius="md">
                      <Text fontWeight="medium" mb={3}>{demographic}</Text>
                      <CheckboxGroup
                        colorScheme="blue"
                        value={selectedDemographics[demographic] || []}
                        onChange={(values) => handleDemographicChange(demographic, values as string[])}
                      >
                        <VStack align="start" spacing={2}>
                          {options.map(option => (
                            <Checkbox key={option} value={option}>
                              {option}
                            </Checkbox>
                          ))}
                        </VStack>
                      </CheckboxGroup>
                    </Box>
                  ))}
                </SimpleGrid>
                
                <Box mb={4}>
                  <Text fontWeight="medium" mb={2}>Selected Demographics</Text>
                  <Flex wrap="wrap" gap={2}>
                    {Object.entries(selectedDemographics).flatMap(([demographic, options]) =>
                      options.map(option => (
                        <Tag key={`${demographic}-${option}`} size="md" borderRadius="full" bg={tagBg} mb={1}>
                          <TagLabel>{option}</TagLabel>
                        </Tag>
                      ))
                    )}
                    {Object.keys(selectedDemographics).length === 0 && (
                      <Text fontSize="sm" color="gray.500">No demographics selected yet</Text>
                    )}
                  </Flex>
                </Box>
              </Box>
            </TabPanel>

            {/* Social Media */}
            <TabPanel>
              <Box>
                <Heading variant="h3" mb={4}>Social Media Platforms</Heading>
                <Text color="gray.600" mb={6}>Connect your social media accounts to track audience engagement and growth across platforms.</Text>
                
                {/* Social Media Stats Summary */}
                <Box mb={6} p={4} borderWidth="1px" borderRadius="md" bg="blue.50">
                  <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4}>
                    <Box textAlign="center">
                      <Text fontSize="sm" color="gray.600">Connected Platforms</Text>
                      <Text fontSize="2xl" fontWeight="bold" color="blue.600">
                        {Object.values(socialData).filter(platform => platform.linked).length}/{SOCIAL_PLATFORMS.length}
                      </Text>
                    </Box>
                    <Box textAlign="center">
                      <Text fontSize="sm" color="gray.600">Total Followers</Text>
                      <Text fontSize="2xl" fontWeight="bold" color="blue.600">
                        {Object.values(socialData).reduce((sum, platform) => {
                          const followers = parseInt(platform.followers.replace(/,/g, '')) || 0;
                          return sum + (platform.linked ? followers : 0);
                        }, 0).toLocaleString()}
                      </Text>
                    </Box>
                    <Box textAlign="center">
                      <Text fontSize="sm" color="gray.600">Most Popular Platform</Text>
                      <Text fontSize="2xl" fontWeight="bold" color="blue.600">
                        {(() => {
                          const linkedPlatforms = Object.entries(socialData).filter(([_, data]) => data.linked);
                          if (linkedPlatforms.length === 0) return 'None';
                          const [topKey] = linkedPlatforms.reduce((max, [key, data]) => {
                            const followers = parseInt(data.followers.replace(/,/g, '')) || 0;
                            const maxFollowers = parseInt(max[1].followers.replace(/,/g, '')) || 0;
                            return followers > maxFollowers ? [key, data] : max;
                          });
                          return SOCIAL_PLATFORMS.find(p => p.key === topKey)?.label || 'None';
                        })()}
                      </Text>
                    </Box>
                  </SimpleGrid>
                </Box>
                
                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
                  {SOCIAL_PLATFORMS.map(platform => (
                    <Box 
                      key={platform.key} 
                      borderWidth="1px" 
                      borderRadius="md" 
                      p={5}
                      transition="all 0.2s"
                      bg={socialData[platform.key].linked ? "gray.50" : "white"}
                      _hover={{ 
                        boxShadow: "md", 
                        borderColor: socialData[platform.key].linked ? "green.200" : "blue.200"
                      }}
                    >
                      <Flex justify="space-between" align="center" mb={4}>
                        <Flex align="center">
                          <Box 
                            bg={`${platform.key}.500`} 
                            color="white" 
                            p={2} 
                            borderRadius="md" 
                            mr={3}
                            minW="40px"
                            textAlign="center"
                          >
                            {platform.label.charAt(0)}
                          </Box>
                          <Text fontWeight="bold" fontSize="lg">{platform.label}</Text>
                        </Flex>
                        
                        {/* Link Account Button */}
                        <Button
                          size="sm"
                          colorScheme={socialData[platform.key].linked ? 'green' : 'blue'}
                          variant={socialData[platform.key].linked ? 'solid' : 'outline'}
                          onClick={() => handleSocialLink(platform.key)}
                          isDisabled={socialData[platform.key].linked}
                          leftIcon={socialData[platform.key].linked ? <span>✓</span> : undefined}
                        >
                          {socialData[platform.key].linked ? 'Connected' : 'Link Account'}
                        </Button>
                      </Flex>
                      
                      <SimpleGrid columns={1} spacing={4}>
                        <FormControl isDisabled={socialData[platform.key].linked}>
                          <FormLabel fontWeight="medium">{platform.label} Profile URL</FormLabel>
                          <Input 
                            type="text" 
                            placeholder={platform.url} 
                            value={socialData[platform.key].url} 
                            onChange={e => handleSocialUrlChange(platform.key, e.target.value)}
                            borderColor={socialData[platform.key].linked ? "gray.200" : "gray.300"}
                            _hover={{ borderColor: socialData[platform.key].linked ? "gray.200" : "blue.300" }}
                          />
                        </FormControl>
                        
                        <FormControl isDisabled={socialData[platform.key].linked}>
                          <FormLabel fontWeight="medium">{platform.followersLabel}</FormLabel>
                          <Input 
                            type="text" 
                            placeholder={platform.fakeValue} 
                            value={socialData[platform.key].followers} 
                            onChange={e => handleSocialFollowersChange(platform.key, e.target.value)}
                            borderColor={socialData[platform.key].linked ? "gray.200" : "gray.300"}
                            _hover={{ borderColor: socialData[platform.key].linked ? "gray.200" : "blue.300" }}
                          />
                        </FormControl>
                      </SimpleGrid>
                      
                      {socialData[platform.key].linked && (
                        <Box mt={4} p={3} bg="green.50" borderRadius="md">
                          <Flex align="center">
                            <Box color="green.500" mr={2}>✓</Box>
                            <Text color="green.700" fontWeight="medium">Successfully connected</Text>
                          </Flex>
                        </Box>
                      )}
                    </Box>
                  ))}
                </SimpleGrid>
              </Box>
            </TabPanel>

            {/* Newsletter */}
            <TabPanel>
              <Box>
                <Flex justify="space-between" align="center" mb={4}>
                  <Heading variant="h3">Newsletter</Heading>
                  <Button 
                    bg="blue.600"
                    color="white"
                    _hover={{ bg: "blue.700" }}
                    size="md"
                    leftIcon={<span>+</span>} 
                    onClick={handleAddNewsletter}
                    boxShadow="md"
                  >
                    Add Newsletter
                  </Button>
                </Flex>
                <Text color="gray.600" mb={4}>Add details for each newsletter you operate to help advertisers understand your reach.</Text>
                
                {/* Newsletter Stats Summary */}
                {newsletters.length > 0 && (
                  <Box mb={6} p={4} borderWidth="1px" borderRadius="md" bg="blue.50">
                    <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4}>
                      <Box textAlign="center">
                        <Text fontSize="sm" color="gray.600">Total Newsletters</Text>
                        <Text fontSize="2xl" fontWeight="bold" color="blue.600">{newsletters.length}</Text>
                      </Box>
                      <Box textAlign="center">
                        <Text fontSize="sm" color="gray.600">Total Subscribers</Text>
                        <Text fontSize="2xl" fontWeight="bold" color="blue.600">
                          {newsletters.reduce((sum, newsletter) => {
                            const subscribers = parseInt(newsletter.subscribers.replace(/,/g, '')) || 0;
                            return sum + subscribers;
                          }, 0).toLocaleString()}
                        </Text>
                      </Box>
                      <Box textAlign="center">
                        <Text fontSize="sm" color="gray.600">Avg. Open Rate</Text>
                        <Text fontSize="2xl" fontWeight="bold" color="blue.600">
                          {Math.round(newsletters.reduce((sum, newsletter) => {
                            return sum + (parseInt(newsletter.openRate) || 0);
                          }, 0) / newsletters.length)}%
                        </Text>
                      </Box>
                    </SimpleGrid>
                  </Box>
                )}
                
                <VStack spacing={4} align="stretch">
                  {newsletters.length === 0 && <Text color="gray.500">No newsletters added yet.</Text>}
                  {newsletters.map(newsletter => (
                    <Box 
                      key={newsletter.id} 
                      borderWidth="1px" 
                      borderRadius="md" 
                      p={4}
                      transition="all 0.2s"
                      _hover={{ boxShadow: "md", borderColor: "blue.200" }}
                    >
                      <Flex justify="space-between" align="center" mb={2}>
                        <Text fontWeight="bold" fontSize="lg">{newsletter.name || 'Untitled Newsletter'}</Text>
                        <Flex gap={2}>
                          <Button size="sm" colorScheme="blue" variant="outline" onClick={() => handleEditNewsletter(newsletter.id)}>Edit</Button>
                          <Button size="sm" colorScheme="red" variant="outline" onClick={() => handleRemoveNewsletter(newsletter.id)}>Remove</Button>
                        </Flex>
                      </Flex>
                      <Text fontSize="sm" color="gray.600" mb={3}>{newsletter.description}</Text>
                      <SimpleGrid columns={{ base: 1, md: 4 }} spacing={4} mt={3}>
                        <Box>
                          <Text fontWeight="medium" fontSize="sm" color="gray.500">Frequency</Text>
                          <Text>{newsletter.frequency}</Text>
                        </Box>
                        <Box>
                          <Text fontWeight="medium" fontSize="sm" color="gray.500">Subscribers</Text>
                          <Text>{newsletter.subscribers}</Text>
                        </Box>
                        <Box>
                          <Text fontWeight="medium" fontSize="sm" color="gray.500">Open Rate</Text>
                          <Text>{newsletter.openRate}%</Text>
                        </Box>
                        <Box>
                          <Text fontWeight="medium" fontSize="sm" color="gray.500">Clicks</Text>
                          <Text>{newsletter.clicks || "N/A"}</Text>
                        </Box>
                      </SimpleGrid>
                    </Box>
                  ))}
                  
                  {/* Bottom Add Newsletter button removed */}
                </VStack>
              </Box>
            </TabPanel>
          </TabPanels>
        </Tabs>

        {/* Newsletter Modal */}
        <Modal isOpen={showNewsletterModal} onClose={() => setShowNewsletterModal(false)} size="lg">
          <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(5px)" />
          <ModalContent>
            <ModalHeader bg="blue.50" borderTopRadius="md">
              <Flex align="center">
                <Box mr={2} color="blue.500" fontSize="xl">📧</Box>
                {editingNewsletter?.id ? 'Edit Newsletter' : 'Add Newsletter'}
              </Flex>
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody pt={6}>
              <Text mb={4} color="gray.600" fontSize="sm">
                Fill in the details about your newsletter to help advertisers understand your audience reach and engagement.
              </Text>
              
              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6} mb={4}>
                <FormControl isRequired>
                  <FormLabel fontWeight="medium">Newsletter Name</FormLabel>
                  <Input 
                    name="name" 
                    value={editingNewsletter?.name || ''} 
                    onChange={handleNewsletterFieldChange} 
                    placeholder="e.g. Weekly Update"
                  />
                </FormControl>
                
                <FormControl isRequired>
                  <FormLabel fontWeight="medium">Frequency</FormLabel>
                  <Select 
                    name="frequency" 
                    value={editingNewsletter?.frequency || ''} 
                    onChange={handleNewsletterFieldChange}
                    placeholder="Select frequency"
                  >
                    {NEWSLETTER_FREQUENCIES.map(f => <option key={f} value={f}>{f}</option>)}
                  </Select>
                </FormControl>
              </SimpleGrid>
              
              <FormControl mb={4} isRequired>
                <FormLabel fontWeight="medium">Description</FormLabel>
                <Textarea 
                  name="description" 
                  value={editingNewsletter?.description || ''} 
                  onChange={handleNewsletterFieldChange}
                  placeholder="Brief description of newsletter content and focus"
                  rows={3}
                />
              </FormControl>
              
              <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6} mb={4}>
                <FormControl>
                  <FormLabel fontWeight="medium">Subscribers</FormLabel>
                  <Input 
                    name="subscribers" 
                    value={editingNewsletter?.subscribers || ''} 
                    onChange={handleNewsletterFieldChange} 
                    placeholder="e.g. 1,500"
                  />
                </FormControl>
                
                <FormControl>
                  <FormLabel fontWeight="medium">Open Rate (%)</FormLabel>
                  <Input 
                    name="openRate" 
                    value={editingNewsletter?.openRate || ''} 
                    onChange={handleNewsletterFieldChange} 
                    placeholder="e.g. 25"
                    type="number"
                    min={0}
                    max={100}
                  />
                </FormControl>
                
                <FormControl>
                  <FormLabel fontWeight="medium">Clicks</FormLabel>
                  <Input 
                    name="clicks" 
                    value={editingNewsletter?.clicks || ''} 
                    onChange={handleNewsletterFieldChange} 
                    placeholder="e.g. 350"
                  />
                </FormControl>
              </SimpleGrid>
              
              <FormControl>
                <FormLabel fontWeight="medium">Sample Newsletter URL</FormLabel>
                <Input 
                  name="sampleUrl" 
                  value={editingNewsletter?.sampleUrl || ''} 
                  onChange={handleNewsletterFieldChange} 
                  placeholder="https://example.com/newsletter-sample"
                />
                <Text fontSize="xs" color="gray.500" mt={1}>
                  Link to a sample or archive of your newsletter for advertisers to review
                </Text>
              </FormControl>
            </ModalBody>
            
            <ModalFooter bg="gray.50" borderBottomRadius="md">
              <Button variant="outline" mr={3} onClick={() => setShowNewsletterModal(false)}>Cancel</Button>
              <Button colorScheme="blue" onClick={handleSaveNewsletter}>Save Newsletter</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>

        {/* Developer Email Modal */}
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Send Code to Developer</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormControl>
                <FormLabel>Developer Email</FormLabel>
                <Input value={developerEmail} onChange={e => setDeveloperEmail(e.target.value)} placeholder="developer@example.com" />
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={onClose}>Send</Button>
              <Button variant="ghost" onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </VStack>
    </SetupLayout>
  );
};

export default AudienceInfoSetup;
