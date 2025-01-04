<?php

declare(strict_types=1);

namespace App\Files;

use storage\StoragePath;

class TempFilesFileSystem extends CustomFilesystem
{
    public function __construct()
    {
        parent::__construct(new LocalFileSystemAdapter(
            StoragePath::ABSOLUTE_PATH . '/runtime/tmp',
        ));
    }
}
