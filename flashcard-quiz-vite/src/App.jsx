import { useState, useEffect } from "react";
import {format} from "date-fns/format";
import UserForm from "./components/UserForm";
import Quiz from "./components/Quiz";
import { questions } from "./data/questions";
import History from "./components/History";
import Timer from "./components/Timer";
import QuestionCard from "./components/QuestionCard";
import Result from "./components/Result";
import ResultModal from "./components/ResultModal";

import "./styles.css";
