import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import axios from '../api/axios';
import useAuth from '../hooks/useAuth';
import useFooterShow from '../hooks/useFooterShow';

const Clock = styled.div`
    position: relative;
    height: 300px;
    width: 300px;

    svg {
        transform: scaleX(-1);
    }

    path {
        stroke-width: 1px;
        stroke-linecap: round;

        transform: rotate(90deg);
        transform-origin: center;

        transition: 1s linear all;

        stroke: #fff;
    }

    g {
        fill: none;
        stroke: none;
    }

    span {
        position: absolute;

        width: 300px;
        height: 300px;

        top: 0;

        display: flex;
        align-items: center;
        justify-content: center;

        color: #fff;
    }
`;

const Session = () => {
    const { auth } = useAuth();
    const { setFooterShow } = useFooterShow();
    const [length, setLength] = useState(-1);
    const [elapsed, setElapsed] = useState(0);
    let [interval, setInt] = useState<NodeJS.Timer>();

    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        setFooterShow({ show: false });

        axios
            .get(`/sessions/${params.id}`, {
                headers: { Authorization: `Bearer ${(auth as any).token}` },
            })
            .then((res) => {
                setLength(res.data.length * 60);
                console.log(interval);
                clearInterval(interval);

                setInt(
                    setInterval(() => {
                        console.log('93pigeons');
                        setElapsed((prev) => prev + 1);
                    }, 1000)
                );
            });

        return () => {
            clearInterval(interval);
        };
    }, []);

    useEffect(() => {
        if (elapsed > length && length > -1) {
            clearInterval(interval);
            axios
                .patch(
                    `/sessions/${params.id}/toggle`,
                    {},
                    {
                        headers: {
                            Authorization: `Bearer ${(auth as any).token}`,
                        },
                    }
                )
                .then(() => navigate('/complete-session'))
                .catch((err) => console.error(err));
        }
    }, [elapsed]);

    return (
        <Clock>
            <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <g>
                    <circle cx="50" cy="50" r="45" />
                    <path
                        id="base-timer-path-remaining"
                        strokeDasharray={`${
                            elapsed < length || length == -1
                                ? ((length - elapsed) / length) * 283
                                : 0
                        } 283`}
                        d="
          M 50, 50
          m -45, 0
          a 45,45 0 1,0 90,0
          a 45,45 0 1,0 -90,0
        "
                    ></path>
                </g>
            </svg>
            <span id="base-timer-label">Meditating...</span>
        </Clock>
    );
};

export default Session;
