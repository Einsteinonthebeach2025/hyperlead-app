"use client"
import { useState, useEffect, useCallback } from 'react';
import { selectHyperSearchModal, setToggle } from 'app/features/modalSlice'
import { AnimatePresence } from 'framer-motion'
import { useDispatch, useSelector } from 'react-redux'
import { hyperSearchLeads, getUnlockedLeads } from 'app/lib/actions/leadActions';
import Close from 'app/components/buttons/Close'
import Spinner from 'app/components/Spinner';
import MotionContainer from 'app/components/containers/MotionContainer'
import debounce from 'lodash/debounce';
import HyperSearchBar from './components/HyperSearchBar';
import { selectUser } from 'app/features/userSlice';
import ResultCard from './components/ResultCard';
import NoResult from './components/NoResult';

const HyperSearchModal = () => {
  const dispatch = useDispatch()
  const { isOpen } = useSelector(selectHyperSearchModal);
  const user = useSelector(selectUser);
  const userId = user?.id;
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [unlockedLeadIds, setUnlockedLeadIds] = useState([]);

  const handleClose = () => {
    dispatch(setToggle({ modalType: "hyperSearch", isOpen: false }));
    setQuery('');
    setResults([]);
    setHasSearched(false);
    setLoading(false);
    setUnlockedLeadIds([]);
  }

  const fetchUnlockedLeads = async () => {
    if (!userId) return;
    const result = await getUnlockedLeads(userId);
    if (result.success) {
      setUnlockedLeadIds(result.data.map(item => item.lead_id));
    }
  };

  const searchLeads = async (searchQuery) => {
    if (searchQuery.length < 2) {
      setResults([]);
      setHasSearched(false);
      return;
    }
    setLoading(true);
    setHasSearched(true);
    try {
      const { success, data, error } = await hyperSearchLeads(searchQuery);
      if (success) {
        setResults(data);
      } else {
        console.error("Failed to fetch leads:", error);
        setResults([]);
      }
    } catch (error) {
      console.error("Failed to fetch leads:", error);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const debouncedSearch = useCallback(debounce(searchLeads, 400), []);

  useEffect(() => {
    debouncedSearch(query);
    return () => {
      debouncedSearch.cancel();
    };
  }, [query, debouncedSearch]);

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setResults([]);
      setHasSearched(false);
      setLoading(false);
      fetchUnlockedLeads(); // Fetch unlocked leads only when modal opens
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <MotionContainer animation='fade-in' className='fixed inset-0 top-0 bg-neutral-400/80 backdrop-blur-sm dark:bg-[#1d2939]/90 z-10 flex items-center justify-center p-4'>
          <div className='bg-white dark:bg-[#151e27] p-6 rounded-lg shadow-[0_10px_25px_rgba(0,0,0,0.5)] w-full max-w-2xl h-[90vh] flex flex-col'>
            <Close onClick={handleClose} className='absolute top-4 right-4' />
            <HyperSearchBar query={query} setQuery={setQuery} />
            <div className="flex-grow overflow-y-auto pr-2 -mr-2">
              {loading && <div className="flex justify-center p-8"><Spinner /></div>}
              <ResultCard handleClose={handleClose} lead={results} loading={loading} hasSearched={hasSearched} unlockedLeadIds={unlockedLeadIds} />
              <NoResult loading={loading} hasSearched={hasSearched} results={results} query={query} />
            </div>
          </div>
        </MotionContainer>
      )}
    </AnimatePresence>
  )
}

export default HyperSearchModal;
