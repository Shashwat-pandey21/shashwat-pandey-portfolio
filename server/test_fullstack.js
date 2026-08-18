const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '.env') });

const BASE_URL = 'http://localhost:5000/api';

const runTests = async () => {
  console.log('🚀 Starting Full-Stack End-to-End Test Suite...');
  let testsPassed = 0;
  let testsFailed = 0;

  const assert = (condition, testName) => {
    if (condition) {
      console.log(`✅ PASS: ${testName}`);
      testsPassed++;
    } else {
      console.error(`❌ FAIL: ${testName}`);
      testsFailed++;
    }
  };

  try {
    // 1. Health Check
    console.log('\n--- Test 1: API Health Check ---');
    const healthRes = await fetch(`${BASE_URL}/health`).then((r) => r.json());
    assert(healthRes.status === 'online', 'Health endpoint responds with online status');

    // 2. Public Profile
    console.log('\n--- Test 2: Public Profile Endpoint ---');
    const profileRes = await fetch(`${BASE_URL}/profile`).then((r) => r.json());
    assert(profileRes.success === true, 'GET /api/profile returns success');
    assert(profileRes.data?.name !== undefined, 'Profile contains developer name');

    // 3. Public Skills
    console.log('\n--- Test 3: Public Skills Endpoint ---');
    const skillsRes = await fetch(`${BASE_URL}/skills`).then((r) => r.json());
    assert(skillsRes.success === true, 'GET /api/skills returns success');
    assert(Array.isArray(skillsRes.data), 'Skills data is an array');
    assert(skillsRes.data.length >= 8, `Expected at least 8 skills, found ${skillsRes.data.length}`);

    // 4. Public Projects
    console.log('\n--- Test 4: Public Projects Endpoint ---');
    const projectsRes = await fetch(`${BASE_URL}/projects`).then((r) => r.json());
    assert(projectsRes.success === true, 'GET /api/projects returns success');
    assert(projectsRes.data.length >= 3, `Expected at least 3 projects, found ${projectsRes.data.length}`);

    const singleProject = projectsRes.data[0];
    const singleProjRes = await fetch(`${BASE_URL}/projects/${singleProject._id}`).then((r) => r.json());
    assert(singleProjRes.success === true, 'GET /api/projects/:id returns single project');

    // 5. Public Experience & Education
    console.log('\n--- Test 5: Public Experience & Education ---');
    const expRes = await fetch(`${BASE_URL}/experience`).then((r) => r.json());
    assert(expRes.success === true && expRes.data.length >= 1, 'Experience returns records');

    const eduRes = await fetch(`${BASE_URL}/education`).then((r) => r.json());
    assert(eduRes.success === true && eduRes.data.length >= 1, 'Education returns records');

    // 6. Public Contact Submission
    console.log('\n--- Test 6: Public Contact Submission ---');
    const contactPayload = {
      name: 'Verification Bot',
      email: 'bot@verification.com',
      subject: 'Automated Test Verification',
      message: 'This is a test message to verify the complete contact pipeline from API to MongoDB.',
    };
    const contactPostRes = await fetch(`${BASE_URL}/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(contactPayload),
    }).then((r) => r.json());
    assert(contactPostRes.success === true, 'POST /api/contact submits message');
    const createdMsgId = contactPostRes.data._id;

    // 7. Admin Authentication
    console.log('\n--- Test 7: Admin Login & JWT Protection ---');
    // Test invalid login
    const invalidLoginRes = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'admin@portfolio.com',
        password: 'WrongPassword!',
      }),
    });
    assert(invalidLoginRes.status === 401, 'Invalid login properly rejected with 401');

    // Test valid login
    const loginRes = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'admin@portfolio.com',
        password: 'Admin@123456',
      }),
    }).then((r) => r.json());
    assert(loginRes.success === true, 'Admin login succeeded');
    const token = loginRes.token;
    assert(!!token, 'JWT token generated');

    const authHeaders = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };

    // 8. Auth Verification (GET /api/auth/me)
    const meRes = await fetch(`${BASE_URL}/auth/me`, { headers: authHeaders }).then((r) => r.json());
    assert(meRes.success === true && meRes.user.role === 'admin', 'GET /api/auth/me returns admin user');

    // 9. Admin Stats Overview
    console.log('\n--- Test 9: Admin Dashboard Stats ---');
    const statsRes = await fetch(`${BASE_URL}/contact/stats`, { headers: authHeaders }).then((r) => r.json());
    assert(statsRes.success === true, 'GET /api/contact/stats returns statistics');
    assert(statsRes.data.totalProjects >= 3, 'Stats includes correct project count');
    assert(statsRes.data.totalMessages >= 1, 'Stats includes contact messages count');

    // 10. Admin Contact Message Management
    console.log('\n--- Test 10: Message Status & Deletion ---');
    const toggleRes = await fetch(`${BASE_URL}/contact/${createdMsgId}/read`, {
      method: 'PUT',
      headers: authHeaders,
      body: JSON.stringify({ isRead: true }),
    }).then((r) => r.json());
    assert(toggleRes.success === true && toggleRes.data.isRead === true, 'PUT /api/contact/:id/read marked as read');

    const deleteMsgRes = await fetch(`${BASE_URL}/contact/${createdMsgId}`, {
      method: 'DELETE',
      headers: authHeaders,
    }).then((r) => r.json());
    assert(deleteMsgRes.success === true, 'DELETE /api/contact/:id successfully deleted test message');

    // 11. Admin Skill CRUD
    console.log('\n--- Test 11: Skill Management CRUD ---');
    const newSkillRes = await fetch(`${BASE_URL}/skills`, {
      method: 'POST',
      headers: authHeaders,
      body: JSON.stringify({
        name: 'Rust Lang',
        category: 'Programming Languages',
        proficiency: 75,
        icon: 'Cpu',
      }),
    }).then((r) => r.json());
    assert(newSkillRes.success === true, 'POST /api/skills created new skill');
    const createdSkillId = newSkillRes.data._id;

    const updateSkillRes = await fetch(`${BASE_URL}/skills/${createdSkillId}`, {
      method: 'PUT',
      headers: authHeaders,
      body: JSON.stringify({ proficiency: 85 }),
    }).then((r) => r.json());
    assert(updateSkillRes.data.proficiency === 85, 'PUT /api/skills/:id updated skill');

    const deleteSkillRes = await fetch(`${BASE_URL}/skills/${createdSkillId}`, {
      method: 'DELETE',
      headers: authHeaders,
    }).then((r) => r.json());
    assert(deleteSkillRes.success === true, 'DELETE /api/skills/:id removed test skill');

    // 12. Admin Project CRUD
    console.log('\n--- Test 12: Project Management CRUD ---');
    const newProjRes = await fetch(`${BASE_URL}/projects`, {
      method: 'POST',
      headers: authHeaders,
      body: JSON.stringify({
        title: 'Temporary Test Project',
        description: 'Testing project creation in test suite',
        technologies: ['React', 'Express'],
        featured: false,
      }),
    }).then((r) => r.json());
    assert(newProjRes.success === true, 'POST /api/projects created project');
    const createdProjId = newProjRes.data._id;

    const deleteProjRes = await fetch(`${BASE_URL}/projects/${createdProjId}`, {
      method: 'DELETE',
      headers: authHeaders,
    }).then((r) => r.json());
    assert(deleteProjRes.success === true, 'DELETE /api/projects/:id removed test project');

    console.log('\n=============================================');
    console.log(`TEST RESULTS: ${testsPassed} Passed, ${testsFailed} Failed.`);
    console.log('=============================================');

    if (testsFailed === 0) {
      console.log('🎉 ALL BACKEND & DATABASE TESTS PASSED PERFECTLY!');
      process.exit(0);
    } else {
      process.exit(1);
    }
  } catch (error) {
    console.error('Test Suite Encountered Fatal Error:', error);
    process.exit(1);
  }
};

runTests();
