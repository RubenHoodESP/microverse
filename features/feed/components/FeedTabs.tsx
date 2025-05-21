type FeedTabsProps = {
  selected: 'suggested' | 'following';
  onSelect: (type: 'suggested' | 'following') => void;
};

export default function FeedTabs({ selected, onSelect }: FeedTabsProps) {
  return (
    <div className="flex border-b border-gray-300">
      <button
        onClick={() => onSelect('suggested')}
        className={`flex-1 py-2 text-center font-medium ${
          selected === 'suggested' ? 'border-b-2 border-black' : 'text-gray-500'
        }`}
      >
        Para ti
      </button>
      <button
        onClick={() => onSelect('following')}
        className={`flex-1 py-2 text-center font-medium ${
          selected === 'following' ? 'border-b-2 border-black' : 'text-gray-500'
        }`}
      >
        Seguidos
      </button>
    </div>
  );
}
