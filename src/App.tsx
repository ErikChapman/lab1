import React, { useState } from 'react';
import { Layout, Menu, Breadcrumb, Input, Button } from 'antd';
import { MenuOutlined, PicLeftOutlined } from '@ant-design/icons';

const { Header, Content, Footer, Sider } = Layout;

const scheduleData: { [key: string]: string[] } = {
    Monday: ['Math', 'Physics', 'Chemistry'],
    Tuesday: ['English', 'History', 'Geography'],
    Wednesday: ['Biology', 'Art', 'Music'],
    Thursday: ['Physical Education', 'Computer Science', 'Drama'],
    Friday: ['Literature', 'Math', 'Physics'],
};

const App: React.FC = () => {
    const [selectedDay, setSelectedDay] = useState<string>('Monday');
    const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
    const [notes, setNotes] = useState<{ [key: string]: string }>({});
    const [note, setNote] = useState<string>('');
    const [isNoteVisible, setIsNoteVisible] = useState<boolean>(true);

    const handleSubjectClick = (subject: string) => {
        setSelectedSubject(subject);
        setNote(notes[subject] || '');
        setIsNoteVisible(true);
    };

    const handleSaveNote = () => {
        if (selectedSubject) {
            setNotes({ ...notes, [selectedSubject]: note });
        }
    };

    const handleHideNote = () => {
        setIsNoteVisible(false);
    };

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider collapsible width={200}>
                <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                    {Object.keys(scheduleData).map((day) => (
                        <Menu.Item key={day} onClick={() => setSelectedDay(day)}>
                            {day}
                        </Menu.Item>
                    ))}
                </Menu>
            </Sider>
            <Layout className="site-layout">
                <Header className="site-layout-background" style={{ padding: '0px', height: '50px' }} />
                <Content style={{ margin: '0 16px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>School Schedule</Breadcrumb.Item>
                        <Breadcrumb.Item>{selectedDay}</Breadcrumb.Item>
                    </Breadcrumb>
                    <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                        <h2>{selectedDay} Schedule</h2>
                        <ul>
                            {scheduleData[selectedDay].map((subject: string, index: number) => (
                                <li key={index} onClick={() => handleSubjectClick(subject)} style={{ cursor: 'pointer' }}>
                                    {subject}
                                </li>
                            ))}
                        </ul>
                    </div>
                </Content>
                <Sider theme="light" width={300} style={{ background: '#rgb(245, 245, 245)', padding: '20px', backgroundColor: 'rgb(245, 245, 245)' }}>
                    {selectedSubject && isNoteVisible && (
                        <>
                            <h3>{selectedSubject}</h3>
                            <div className="note-input-container">
                                <Input.TextArea
                                    value={note}
                                    onChange={(e) => setNote(e.target.value)}
                                    className="note-input"
                                />
                                <Button type="primary" onClick={handleSaveNote}>Save Note</Button>
                                <Button className="hide-button" onClick={handleHideNote}>Hide Note</Button>
                            </div>
                        </>
                    )}
                </Sider>
            </Layout>
        </Layout>
    );
};

export default App;
