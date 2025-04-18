import React, { useState } from 'react';
import {
  Box,
  Button,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Text,
  Avatar,
  HStack,
  VStack,
  Badge,
  IconButton,
  useColorModeValue,
} from '@chakra-ui/react';
import { 
  FiPlus, 
  FiEdit2, 
  FiTrash2, 
  FiMail, 
  FiPhone, 
  FiSearch,
  FiUsers,
  FiFilter,
} from 'react-icons/fi';
import MainLayout from '@/components/layout/MainLayout';
import Heading from '@/components/ui/Heading';

// Define team member type
interface TeamMember {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: string;
  department: string;
  avatar: string;
  status: 'active' | 'inactive';
}

// Sample team member data
const initialTeamMembers: TeamMember[] = [
  {
    id: 1,
    name: 'Sarah Johnson',
    email: 'sarah.johnson@empowerlocal.com',
    phone: '(503) 555-1234',
    role: 'Administrator',
    department: 'Management',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=256&q=80',
    status: 'active',
  },
  {
    id: 2,
    name: 'Michael Chen',
    email: 'michael.chen@empowerlocal.com',
    phone: '(503) 555-2345',
    role: 'Editor',
    department: 'Content',
    avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=256&q=80',
    status: 'active',
  },
  {
    id: 3,
    name: 'Jessica Williams',
    email: 'jessica.williams@empowerlocal.com',
    phone: '(503) 555-3456',
    role: 'Sales Manager',
    department: 'Sales',
    avatar: 'https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=256&q=80',
    status: 'active',
  },
  {
    id: 4,
    name: 'David Rodriguez',
    email: 'david.rodriguez@empowerlocal.com',
    phone: '(503) 555-4567',
    role: 'Designer',
    department: 'Creative',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=256&q=80',
    status: 'active',
  },
  {
    id: 5,
    name: 'Amanda Lee',
    email: 'amanda.lee@empowerlocal.com',
    phone: '(503) 555-5678',
    role: 'Account Manager',
    department: 'Sales',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=256&q=80',
    status: 'inactive',
  },
];

// Available roles
const roles = [
  'Administrator',
  'Editor',
  'Sales Manager',
  'Account Manager',
  'Designer',
  'Content Writer',
  'Marketing Specialist',
  'Developer',
  'Analyst',
];

// Available departments
const departments = [
  'Management',
  'Sales',
  'Content',
  'Creative',
  'Marketing',
  'Technology',
  'Finance',
  'Human Resources',
];

const TeamPage: React.FC = () => {
  // State
  const [teamMembers] = useState<TeamMember[]>(initialTeamMembers);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Color mode values
  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const textColor = useColorModeValue('gray.800', 'white');
  const secondaryTextColor = useColorModeValue('gray.600', 'gray.400');

  // Filter team members based on search query
  const filteredTeamMembers = teamMembers.filter((member) => {
    return searchQuery === '' || 
           member.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
           member.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
           member.role.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <MainLayout>
      <Box p={5}>
        <Flex justifyContent="space-between" alignItems="center" mb={6}>
          <Heading variant="h2" size="lg">Team Management</Heading>
          <Button 
            leftIcon={<FiPlus />} 
            bgGradient="linear-gradient(135deg, #2563EB 0%, #4F46E5 100%)"
            color="white"
            size="lg"
            boxShadow="0px 4px 10px rgba(0, 0, 0, 0.2)"
            _hover={{ bgGradient: 'linear-gradient(135deg, #1E56D9 0%, #4338CA 100%)', boxShadow: '0px 6px 15px rgba(0, 0, 0, 0.3)' }}
            px={8}
            py={6}
            borderRadius="xl"
            fontWeight="bold"
          >
            Add Team Member
          </Button>
        </Flex>

        <Box bg={cardBg} p={5} borderRadius="xl" boxShadow="md" borderWidth="1px" borderColor={borderColor} mb={6}>
          <Flex direction={{ base: 'column', md: 'row' }} gap={4} mb={6}>
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <FiSearch color="gray.300" />
              </InputLeftElement>
              <Input 
                placeholder="Search by name, email, or role" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </InputGroup>
          </Flex>

          <Box overflowX="auto">
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Team Member</Th>
                  <Th>Contact</Th>
                  <Th>Role</Th>
                  <Th>Department</Th>
                  <Th>Status</Th>
                  <Th>Actions</Th>
                </Tr>
              </Thead>
              <Tbody>
                {filteredTeamMembers.map((member) => (
                  <Tr key={member.id}>
                    <Td>
                      <HStack spacing={3}>
                        <Avatar size="md" src={member.avatar} name={member.name} />
                        <Text fontWeight="medium">{member.name}</Text>
                      </HStack>
                    </Td>
                    <Td>
                      <VStack align="start" spacing={1}>
                        <HStack>
                          <FiMail size={14} />
                          <Text fontSize="sm">{member.email}</Text>
                        </HStack>
                        <HStack>
                          <FiPhone size={14} />
                          <Text fontSize="sm">{member.phone}</Text>
                        </HStack>
                      </VStack>
                    </Td>
                    <Td>{member.role}</Td>
                    <Td>{member.department}</Td>
                    <Td>
                      <Badge 
                        colorScheme={member.status === 'active' ? 'green' : 'gray'}
                        borderRadius="full"
                        px={2}
                        py={1}
                      >
                        {member.status === 'active' ? 'Active' : 'Inactive'}
                      </Badge>
                    </Td>
                    <Td>
                      <HStack spacing={2}>
                        <IconButton
                          aria-label="Edit team member"
                          icon={<FiEdit2 />}
                          size="sm"
                          colorScheme="blue"
                        />
                        <IconButton
                          aria-label="Delete team member"
                          icon={<FiTrash2 />}
                          size="sm"
                          colorScheme="red"
                        />
                      </HStack>
                    </Td>
                  </Tr>
                ))}
                {teamMembers.length === 0 && (
                  <Tr>
                    <Td colSpan={6}>
                      <Box textAlign="center" py={4}>
                        <FiUsers size={40} style={{ margin: '0 auto', opacity: 0.3 }} />
                        <Text mt={2} color={secondaryTextColor}>No team members found</Text>
                      </Box>
                    </Td>
                  </Tr>
                )}
              </Tbody>
            </Table>
          </Box>
        </Box>


      </Box>
    </MainLayout>
  );
};

export default TeamPage;
