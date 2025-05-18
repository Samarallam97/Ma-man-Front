
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../../context/LanguageContext';
import PageTransition from '../../components/common/PageTransition';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { format } from 'date-fns';

const Container = styled.div`
  min-height: calc(100vh - 140px);
  padding: var(--spacing-4);
  background: linear-gradient(135deg, var(--background-color) 0%, var(--card-background) 100%);
`;

const Content = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: var(--spacing-4);

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
  }
`;

const ProfileCard = styled.div`
  background: var(--card-background);
  border-radius: var(--radius-lg);
  padding: var(--spacing-4);
  box-shadow: 0 4px 12px var(--shadow-color);
`;

const ProfileImage = styled.div`
  width: 150px;
  height: 150px;
  margin: 0 auto var(--spacing-4);
  border-radius: 50%;
  overflow: hidden;
  position: relative;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  button {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.7);
    color: white;
    padding: var(--spacing-1);
    font-size: 0.875rem;
    border: none;
    cursor: pointer;
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover button {
    opacity: 1;
  }
`;

const ProfileInfo = styled.div`
  text-align: center;

  h2 {
    color: var(--text-color);
    margin-bottom: var(--spacing-2);
  }

  p {
    color: var(--text-secondary);
    margin-bottom: var(--spacing-1);
  }
`;

const MainContent = styled.div`
  background: var(--card-background);
  border-radius: var(--radius-lg);
  padding: var(--spacing-4);
  box-shadow: 0 4px 12px var(--shadow-color);
`;

const Section = styled.div`
  margin-bottom: var(--spacing-4);

  h3 {
    color: var(--primary-color);
    margin-bottom: var(--spacing-3);
    padding-bottom: var(--spacing-2);
    border-bottom: 1px solid var(--border-color);
  }
`;

const FormGroup = styled.div`
  margin-bottom: var(--spacing-3);

  label {
    display: block;
    margin-bottom: var(--spacing-1);
    color: var(--text-color);
  }

  input {
    width: 100%;
    padding: var(--spacing-2);
    border: 1px solid var(--border-color);
    border-radius: var(--radius-md);
    background: var(--background-color);
    color: var(--text-color);

    &:focus {
      outline: none;
      border-color: var(--primary-color);
    }
  }
`;

const KidsSection = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: var(--spacing-3);
`;

const KidCard = styled.div`
  background: var(--background-color);
  border-radius: var(--radius-md);
  padding: var(--spacing-3);
  border: 1px solid var(--border-color);
  position: relative;

  h4 {
    color: var(--text-color);
    margin-bottom: var(--spacing-2);
  }

  p {
    color: var(--text-secondary);
    font-size: 0.875rem;
    margin-bottom: var(--spacing-1);
  }

  button {
    margin-top: var(--spacing-2);
    font-size: 0.875rem;
  }
`;

const Button = styled(motion.button)`
  background: var(--primary-color);
  color: white;
  padding: var(--spacing-2) var(--spacing-4);
  border-radius: var(--radius-md);
  border: none;
  cursor: pointer;
  font-weight: 600;

  &:hover {
    background: var(--primary-light);
  }

  &:disabled {
    background: var(--border-color);
    cursor: not-allowed;
  }
`;

const AddKidButton = styled(Button)`
  margin-top: var(--spacing-2);
  width: 100%;
`;

function Profile() {
  const { t } = useTranslation();
  const { language } = useLanguage();

  const [user, setUser] = useState({
    fullName: "Omar Allam",
    profilePictureUrl: null,
    dailyUsageLimit: null,
    dailyUsageToday: 0,
    lastAccessDate: new Date().toISOString(),
    role: "parent",
    kids: [
      {
        id: 1,
        name: "Ahmed",
        age: 10,
        dailyUsageLimit: 120,
        dailyUsageToday: 45,
        lastAccessDate: new Date().toISOString()
      },
      {
        id: 2,
        name: "Sara",
        age: 8,
        dailyUsageLimit: 90,
        dailyUsageToday: 30,
        lastAccessDate: new Date().toISOString()
      }
    ]
  });

  const handleProfileUpdate = (e) => {
    e.preventDefault();
    // Handle real update logic here
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Handle image upload logic here
    }
  };

  const handleKidUsageLimitUpdate = (kidId, newLimit) => {
    setUser((prev) => ({
      ...prev,
      kids: prev.kids.map((kid) =>
        kid.id === kidId ? { ...kid, dailyUsageLimit: parseInt(newLimit) || 0 } : kid
      )
    }));
  };

  const handleKidNameChange = (kidId, newName) => {
    setUser((prev) => ({
      ...prev,
      kids: prev.kids.map((kid) =>
        kid.id === kidId ? { ...kid, name: newName } : kid
      )
    }));
  };

  const handleKidAgeChange = (kidId, newAge) => {
    setUser((prev) => ({
      ...prev,
      kids: prev.kids.map((kid) =>
        kid.id === kidId ? { ...kid, age: parseInt(newAge) || '' } : kid
      )
    }));
  };

  const addKid = () => {
    const newKid = {
      id: Date.now(), // Unique ID
      name: 'New Kid',
      age: '',
      dailyUsageLimit: 60,
      dailyUsageToday: 0,
      lastAccessDate: new Date().toISOString()
    };
    setUser((prev) => ({
      ...prev,
      kids: [...prev.kids, newKid]
    }));
  };

  const deleteKid = (kidId) => {
    setUser((prev) => ({
      ...prev,
      kids: prev.kids.filter((kid) => kid.id !== kidId)
    }));
  };

  return (
    <PageTransition>
      <Container>
        <Content>
          {/* Left Sidebar - User Info */}
          <ProfileCard>
            <ProfileImage>
              <img
                src={user.profilePictureUrl || "https://media.istockphoto.com/id/1214428300/vector/default-profile-picture-avatar-photo-placeholder-vector-illustration.jpg?s=612x612&w=0&k=20&c=vftMdLhldDx9houN4V-g3C9k0xl6YeBcoB_Rk6Trce0= "}
                alt={user.fullName}
              />
              <input
                type="file"
                id="profileImage"
                accept="image/*"
                onChange={handleImageUpload}
                style={{ display: 'none' }}
              />
              <button onClick={() => document.getElementById('profileImage').click()}>
                Change Photo
              </button>
            </ProfileImage>

            <ProfileInfo>
              <h2>{user.fullName}</h2>
              <p>{user.role}</p>
              {user.lastAccessDate && (
                <p>Last access: {format(new Date(user.lastAccessDate), 'PPP')}</p>
              )}
            </ProfileInfo>
          </ProfileCard>

          {/* Right Side - Editable Form */}
          <MainContent>
            <Section>
              <h3>Profile Settings</h3>
              <form onSubmit={handleProfileUpdate}>
                <FormGroup>
                  <label>Full Name</label>
                  <input
                    type="text"
                    value={user.fullName}
                    onChange={(e) => setUser((prev) => ({ ...prev, fullName: e.target.value }))}
                  />
                </FormGroup>

                {user.role === 'parent' && (
                  <FormGroup>
                    <label>Daily Usage Limit (minutes)</label>
                    <input
                      type="number"
                      value={user.dailyUsageLimit || ''}
                      onChange={(e) =>
                        setUser((prev) => ({ ...prev, dailyUsageLimit: e.target.value }))
                      }
                    />
                  </FormGroup>
                )}

                <Button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Save Changes
                </Button>
              </form>
            </Section>

            {/* Kids Management for Parent */}
            {user.role === 'parent' && user.kids && (
              <Section>
                <h3>Kids Management</h3>
                <KidsSection>
                  {user.kids.map((kid) => (
                    <KidCard key={kid.id}>
                      <FormGroup>
                        <label>Kid's Name</label>
                        <input
                          type="text"
                          value={kid.name}
                          onChange={(e) => handleKidNameChange(kid.id, e.target.value)}
                        />
                      </FormGroup>
                      <FormGroup>
                        <label>Age</label>
                        <input
                          type="number"
                          value={kid.age}
                          onChange={(e) => handleKidAgeChange(kid.id, e.target.value)}
                        />
                      </FormGroup>
                      <FormGroup>
                        <label>Daily Limit (minutes)</label>
                        <input
                          type="number"
                          value={kid.dailyUsageLimit}
                          onChange={(e) =>
                            handleKidUsageLimitUpdate(kid.id, e.target.value)
                          }
                        />
                      </FormGroup>
                      <p>Today's Usage: {kid.dailyUsageToday} minutes</p>
                      <p>Last Access: {format(new Date(kid.lastAccessDate), 'PPP')}</p>
                      <Button
                        onClick={() => deleteKid(kid.id)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        Delete Kid
                      </Button>
                    </KidCard>
                  ))}
                </KidsSection>
                <AddKidButton
                  onClick={addKid}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  + Add New Kid
                </AddKidButton>
              </Section>
            )}
          </MainContent>
        </Content>
      </Container>
    </PageTransition>
  );
}

export default Profile;